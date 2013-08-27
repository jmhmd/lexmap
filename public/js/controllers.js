'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
		$scope.textToAnnotate = 'Melanoma is a malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye'
		$scope.annotationResult = ''

		$scope.getAnnotations = function(){

			$http.get('/api/getTerms/annotations', {params: {text: $scope.textToAnnotate}})
				.then(function(result){
					var coords = {},
						resultBox = $('#annotationResult'),
						resultDetails = $('#resultDetails'),
						text = $scope.textToAnnotate,
						textLength = text.length,
						newLength = textLength

					console.log('request result', result)

					/*
					/* aggregate data for matched term
					*/
					var terms = {},
						termsSorted = []

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

					termsSorted = _.sortBy(terms, function(term){ return term.from })

					console.log('terms', terms)
					
					// place spans around each matched term
					_.forEach(termsSorted, function(term, i){
						/*
						/* New tactic
						*/

						// annotator incorrectly defines first character as position 1
						term.from = term.from - 1

						var lengthDiff = newLength - textLength,
							openTag = '<span id="term_'+i+'">',
							closeTag = '</span>',
							beforeTerm = text.slice(0,term.from + lengthDiff),
							termText = text.slice(term.from + lengthDiff, term.to + lengthDiff),
							afterTerm = text.slice(term.to + lengthDiff),
							replacedText = beforeTerm + openTag + termText + closeTag + afterTerm

						text = replacedText
						newLength = text.length
					})

					resultBox.html(text)

					_.forEach(termsSorted, function(term, i){
						var termDetails = '<h4>Preferred Name:</h4>'+
							'<span>'+term.term+'</span>'+
							'<h4>Is a:</h4>'+
							'<span>'+term.isA.join(', ')+'</span>'+
							'<h4>Link:</h4>'+
							'<span>'+term.link+'</span>'

						$('#term_'+i)
							.attr({
								'class': 'term_hilite'
							})
							.data('details', termDetails)
							.on('click', function(e){
								resultDetails.html($(e.target).data('details'))
							})
					})
				})
		}
}])