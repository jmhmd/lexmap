'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('AppCtrl', ['$scope', '$http', 'Annotator', function ($scope, $http, Annotator) {
		var spinner = new Spinner({top: '50px'})

		$scope.textToAnnotate = 'Melanoma is a malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye'
		$scope.uploadFile
		$scope.options = {
			showAllInstances: true,
			ontologies: {
				Radlex: true,
				SNOMEDCT: false,
				LOINC: false
			}
		}

		$scope.annotateText = function(){

			spinner.spin($('#annotationResult').get(0))

			Annotator.notateText($scope.textToAnnotate, $scope.options, function(err){
				spinner.stop()
			})
		}

		$scope.annotateFile = function(){

			spinner.spin($('#annotationResult').get(0))

			Annotator.notateFile($scope.uploadFile, $scope.options, function(err){
				spinner.stop()
			})
		}
}])