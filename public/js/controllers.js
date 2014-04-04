'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
	.controller('AppCtrl', ['$scope', '$http', 'Annotator', function ($scope, $http, Annotator) {
		var spinner = new Spinner({top: '50px'})

		$scope.textToAnnotate = 'Melanoma is a malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye'
		$scope.uploadFile
		$scope.radReport
		$scope.options = {
			showAllInstances: true,
			ontologies: {
				Radlex: true,
				SNOMED: false,
				LOINC: false
			}
		}

		getReportList();

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

		$scope.getTemplate = function(){

			var template = { id : $scope.template.id}
			
			spinner.spin($('#annotationResult').get(0))

			$http.post('/api/getTemplate', template).then( function(result) {
				$scope.radReport = result.data.response.template[0].templateData
				console.log(result.data.response.template[0].title)
				
				Annotator.notateText($scope.radReport, $scope.options, function(err){
					spinner.stop()
				})
			})
		}

		function getReportList(){
			$http.post('/api/getReportList').then( function(result) {
			$scope.templateList = result.data.response.template
		})
	}
}])