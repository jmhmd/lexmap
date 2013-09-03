'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .service('Annotator', ['$http', function($http){
  		var that = this

		this.notateText = function(text, opts, cb){
			var defaultOpts = {
					showAllInstances: true
				}
			if(_.isFunction(opts)){
				cb = opts
				opts = defaultOpts
			}
			else if (_.isObject(opts)){
				_.defaults(opts,defaultOpts)
			}

			text = text.replace(/\n/g, ' <br> ')

			console.log('sent annotator request')

			$http.post('/api/getTerms/annotations', {text: text})
				.then(function(result){
					var resultBox = $('#annotationResult')

					console.log('annotator results returned')

					/*
					/* aggregate data for matched term, get all instances of term
					/* terms format should be:
					{
						'preferred-name': {
							term: 'String',
							isA: ['String'],
							coords: [ [from,to], ... ], // all other instances of the term
							link: 'link to bioportal term def'
						}
					
					}
					*/
					var terms = {}

					_.forEach(result.data, function(val){
						if (_.isUndefined(terms[val.term])){
							terms[val.term] = {
								term: val.term,
								isA: _.isUndefined(val.isA) ? [] : [val.isA],
								coords: [[val.from, val.to]],
								link: val.link
							}
						} else {
							var termMatched = _.filter(terms[val.term].coords, function(coord){
													return _.isEqual(coord, [val.from, val.to])
												}).length
							if (termMatched > 0){
								// matched term already seen, could have different isA definition
								if (!_.isUndefined(val.isA) && !_.contains(terms[val.term].isA, val.isA)){
									terms[val.term].isA.push(val.isA)
								}
							} else {
								// matched term coords not seen yet, add to list
								terms[val.term].coords.push([val.from, val.to])
							}
						}
					})

					/*
					/* Sort terms by first occurrence
					*/
					if (!opts.showAllInstances){
						// first sort each term's instances
						_.forEach(terms, function(val, i){
							terms[i].coords = _.sortBy(val.coords, function(coord){return coord[0]})
						})
						// then sort terms by their first instance's location
						terms = _.sortBy(terms, function(term){return term.coords[0][0]})
					}

					/*
					/* give each term an id for use with assigning highlighting classes
					*/
					var i = 1
					terms = _.map(terms, function(term){
						term._id = i
						i++
						return term
					})

					/*
					/* start sorting out words, and which phrases they are included in
					*/

					// return first non-space character index
					function getNextStart(text, startIndex){
						var startIndex = startIndex || 0

						if (text.substr(startIndex, 1) != ' '){ return startIndex }

						var	nextSpace = text.indexOf(' ', startIndex),
							nextWord = nextSpace + 1

						while (text.substr(nextWord, 1) == ' '){
							nextWord += 1
						}

						return nextWord
					}

					// return first space character index
					function getNextEnd(text, startIndex){
						var end = text.indexOf(' ', startIndex || 0)
						return end === -1 ? text.length : end
					}


					//build array of each word in text box, as bounded by space character
					function getWords(text, startIndex, endIndex){
						var startIndex = startIndex || 0,
							endIndex = endIndex || text.length,
							words = []

						while (startIndex < endIndex) {
							var next = getNextStart(text, startIndex),
								end = getNextEnd(text, next)
							words.push([next, end])
							startIndex = end
						}

						return words
					}

					var newText = '',
						words = getWords(text)

					// for each word in raw text, check if it falls within
					// any term's bounds, and if it does, add that term's class
					function isInBounds(val, bounds){
					// takes val [from, to] and bounds [from, to]. Returns true if val.from is equal to
					// bounds.from or between bounds.from and bounds.to
					// TODO: make option for index correction (this data source uses first char as index 1)
						if (val[0] === bounds[0] - 1 || (val[0] > bounds[0] - 1 && val[0] < bounds[1])){
							return true
						}
					}
					function addPadding(curr, last){
						// check if previous word matched same term
						var padded = [],
							intersection = _.intersection(curr, last),
							difference = _.difference(curr, last)

						_.forEach(intersection, function(termId, i){
							var lastIndex = _.indexOf(last, termId)
							if (lastIndex > -1){
								for (var j=padded.length; j<lastIndex; j++){ padded.push(0) }
							}
							padded.push(termId)
						})
						// tack on terms not matched on prior word
						return padded.concat(difference)
					}

					var matchedPhrases = []
					_.forEach(words, function(val, i){
						var classes = '',
							divPadding = 0,
							word = text.substr(val[0],val[1]-val[0])

						matchedPhrases[i] = []

						_.forEach(terms, function(term){
							if (opts.showAllInstances){
								_.forEach(term.coords, function(coord){
									if (isInBounds(val, coord)){
										matchedPhrases[i].push(term._id)
										classes += 't_'+term._id+' '
									}
								})	
							} else { // only check first instance of word
								if (isInBounds(val, term.coords[0])){
									matchedPhrases[i].push(term._id)
									classes += 't_'+term._id+' '
								}
							}
						})


						if (matchedPhrases[i].length > 0){
							newText += '<span id="w_'+i+'" class="matched-word '+classes+'">' + word +
								'<div class="underline-container">'
							if (i > 0 && matchedPhrases[i-1].length > 0){
								matchedPhrases[i] = addPadding(matchedPhrases[i], matchedPhrases[i-1])
							}
							// add empty divs for padding
							_.forEach(matchedPhrases[i], function(termId){
								if (termId === 0){
									newText += '<div class="padding"></div>'
								} else {
									newText += '<div class="underline t_'+termId+'"></div>'
								}
							})
							newText += '</div></span> '

						} else {
							newText += word + ' '
						}
					})

					//console.log(phrases)

					resultBox.html(newText)
					that.hiliteText(terms)

					cb(null, {
							notatedText: newText,
							terms: terms
						})
  				})
		}

		this.notateFile = function(files, opts, cb){
			if(_.isFunction(opts)){
				cb = opts
				opts = {}
			}

			var fileParser = new XmlParser()
			
			fileParser.parseFiles(files, function(err, parsedFile){
				that.notateText(parsedFile, opts, cb)
			})
		}

		this.hiliteText = function(terms){
			var resultDetails = $('#resultDetails')

			_.forEach(terms, function(term){
				var termDetails = '<h4>Preferred Name:</h4>'+
					'<span>'+term.term+'</span>'+
					'<h4>Is a:</h4>'+
					'<span>'+term.isA.join(', ')+'</span>'+
					'<h4>Link:</h4>'+
					'<a href="'+term.link+'" title="'+term.link+'" target="_blank">BioPortal Definition</span>'

				$('.matched-word.t_'+term._id)
					//.attr({
					//	'class': 'term_hilite'
					//})
					.addClass('term_hilite')
					//.css()
					.data('details', termDetails)
					.on('click', function(e){
						resultDetails.html($(e.target).data('details'))
					})
					.find('div.underline-container')

				$('.underline.t_'+term._id)
					.css({'background-color': '#'+(Math.random().toString(16) + '000000').slice(2, 8)})
			})
		}
	}])
