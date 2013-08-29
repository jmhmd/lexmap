'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .service('Annotator', ['$http', function($http){
  		var that = this

		this.notateText = function(text, opts, cb){
			if(_.isFunction(opts)){ cb = opts }

			text = text.replace(/\n/g, ' <br> ')

			$http.post('/api/getTerms/annotations', {text: text})
				.then(function(result){
					var resultBox = $('#annotationResult')

					console.log('request result', result)

					/*
					/* aggregate data for matched term
					*/
					var terms = {}

					_.forEach(result.data, function(val){
						if (_.isUndefined(terms[val.term])){
							terms[val.term] = val
							terms[val.term].isA = _.isUndefined(terms[val.term].isA) ? [] : [terms[val.term].isA]
						} else if (terms[val.term].from === val.from){
							if (!_.isUndefined(val.isA)){
								terms[val.term].isA.push(val.isA)
							}
						}
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

					// give each term an id
					var i = 1
					terms = _.map(terms, function(term){
						term._id = i
						i++
						return term
					})

					var phrases = []
					_.forEach(words, function(val, i){
						phrases[i] = []
						var classes = '',
							word = text.substr(val[0],val[1]-val[0])

						_.forEach(terms, function(term){
							if (val[0] === term.from - 1 || (val[0] > term.from - 1 && val[0] < term.to)){
								phrases[i].push(term._id)
								classes += 't_'+term._id+' '
							}
						})


						if (phrases[i].length > 0){
							newText += '<span id="w_'+i+'" class="'+classes+'">' + word +
								'<div class="underline-container"></div></span> '

						} else {
							newText += word + ' '
						}
					})

					console.log(phrases)

					resultBox.html(newText)
					that.hiliteText(terms)

					cb(null, {
							notatedText: newText,
							terms: terms
						})
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
					'<a href="'+term.link+'" target="_blank">'+term.link+'</span>'

				$('.t_'+term._id)
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
					.append($('<div>')
						.attr({'class': 'underline'})
						.css({'background-color': '#'+(Math.random().toString(16) + '000000').slice(2, 8)})
					)
			})
		}
	}])
