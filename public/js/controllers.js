'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('AppCtrl', ['$scope', '$http', 'Annotator', function ($scope, $http, Annotator) {
		var spinner = new Spinner({top: '50px'})

		$scope.textToAnnotate = 'Melanoma is a uterine artery embolization malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye'
		$scope.annotationResult = ''
		$scope.uploadFile

		$scope.annotateText = function(){

			spinner.spin($('#annotationResult').get(0))

			Annotator.notateText($scope.textToAnnotate, function(err){
				spinner.stop()
			})
		}

		$scope.annotateFile = function(){

			spinner.spin($('#annotationResult').get(0))

			Annotator.notateFile($scope.uploadFile.files, function(err){
				spinner.stop()
			})
		}
}])