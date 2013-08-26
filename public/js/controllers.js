'use strict';

/* Controllers */

angular.module('myApp.controllers', []).controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
	$scope.textToAnnotate = 'Melanoma is a malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye'
	$scope.annotationResult = ''

	$scope.getAnnotations = function(){

		$http.get('/api/getTerms/annotations', {params: {text: $scope.textToAnnotate}})
			.then(function(result){
				var coords = {},
					resultBox = $('#annotationResult'),
					resultDetails = $('#resultDetails'),
					text = $scope.textToAnnotate

				console.log('request result', result)
				/*initPopovers = function(){
					$('[rel=popover]').popover({trigger: 'hover', placement: 'right'})
				}*/

				/*
				/* aggregate data for matched term
				*/
				var terms = {}
				_.forEach(result.data, function(val){
					if (_.isUndefined(terms[val.term])){
						terms[val.term] = val
						terms[val.term].isA = _.isUndefined(terms[val.term].isA) ? [] : [terms[val.term].isA]
					} else {
						if (!_.isUndefined(val.term.isA)){
							terms[val.term].isA.push(val.term.isA)
						}
					}
				})

				console.log('terms', terms)
				
				_.forEach( terms, function(term, i){
				
					/*if (typeof term.isA === 'undefined' || term.isA === 'Radlex ontology entity') {
						if (i == result.length - 1) {
							initPopovers()
						}
						return
					}*/ 

					/*
					/* Generate hilighting boxes
					*/
					// correct for 0 (i think)
					term.from = term.from - 1
					
					var termDetails = '<h4>Preferred Name:</h4>'+
						'<span>'+term.term+'</span>'+
						'<h4>Is a:</h4>'+
						'<span>'+term.isA.join(', ')+'</span>'+
						'<h4>Link:</h4>'+
						'<span>'+term.link+'</span>'

					var hiliteBox = $('<div>'),
						clickBox = $('<div>')
					var replText = text.substr(0, term.from) + '<span id="termCoord">' +
						text.substr(term.from, (term.to - term.from)) + '</span>' + text.substr(term.to, text.length)
					resultBox.html(replText)
					
					// Now that a span surrounds our term, measure it so we can create the overlay
					var termBox = $('#termCoord')
					coords[i] = termBox.position()
					coords[i].width = termBox.width()
					coords[i].height = termBox.height()
					
					hiliteBox
						.css({ 
							left: Math.floor(coords[i].left) - 2,
							top: Math.floor(coords[i].top) - 2,
							height: coords[i].height + 1,
							width: coords[i].width + 1
						})
						.attr({
							'class': 'term_hilite'
						})
					clickBox
						.css({ 
							left: Math.floor(coords[i].left) - 2,
							top: Math.floor(coords[i].top) - 2,
							height: coords[i].height + 1,
							width: coords[i].width + 1,
						})
						.attr({
							'class': 'term_click'
						})
						.data('details', termDetails)
						.on('click', function(e){
							resultDetails.html($(e.target).data('details'))
						})
					
					resultBox.parent().append(hiliteBox).append(clickBox)
					
					resultBox.html(text)
					
					/*if (i === result.length - 1) {
						initPopovers()
					}*/
				})
				
				console.log('coords',coords)
			})
	}
}])