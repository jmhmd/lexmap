var request = require('request'),
	//xmlParser = require('xml2js').parseString,
	sax = request('sax'),
	memwatch = require('memwatch')


memwatch.on('leak', function(info) { 
		console.log(info)
	})

//API_KEY= '24e050ca-54e0-11e0-9d7b-005056aa3316'
var API_KEY= '5758f84b-562e-46cb-890b-ff787cc52bed',
	annotatorUrl = 'http://rest.bioontology.org/obs/annotator',
	submitUrl = annotatorUrl + '/submit/jhostetter@gmail.com'

var textToAnnotate = "Melanoma is a malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye"

/*---------------------
// virtual ontology ids:
// Radlex: 1057/50515
// LOINC: 1350/47637
// SNOMED: 1353/46896
*/
var params = {
		'longestOnly':'false',
		'wholeWordOnly':'true',
		'withContext':'true',
		'filterNumber':'true', 
		'stopWords':'',
		'withDefaultStopWords':'false', 
		'isStopWordsCaseSenstive':'false', 
		'minTermSize':'3', 
		'scored':'true',  
		'withSynonyms':'true', 
		'ontologiesToExpand':'1057,1350,1353',   
		'ontologiesToKeepInResult':'1057,1350,1353',   
		'isVirtualOntologyId':'true', 
		'semanticTypes':'',  //T017,T047,T191&" #T999&"
		'levelMax':'0',
		'mappingTypes':'null', 
		'textToAnnotate': textToAnnotate, 
		'format':'xml',  //Output formats (one of): xml, tabDelimited, text  
		'apikey':API_KEY,
	}

getAnnotations = function (text, cb) {
	result = {}
	
	params.textToAnnotate = text || params.textToAnnotate
	
	var hd = new memwatch.HeapDiff()
	// Submit job
	request.post(submitUrl, {form: params}, function(error, response, body){
		if (error){
			console.log(error)
			return new Error(error)
		}
		/*var file = new DOMParser(),
			parser = file.parseFromString(response.body, "text/xml"),
			annotationsXML = parser.getElementsByTagName("annotationBean")*/

		if (typeof cb === 'function'){
			cb(null, {annotations: response.body})
		} else {
			return {annotations: response.body}
		}

		var diff = hd.end()
		console.log('diff: ', diff, diff.change.details)

		/*
		//console.log('annotator response: ',response.body)
		xmlParser(response.body, function(err, parsedObj){
			if (error){
				console.log(error)
				cb(error)
			}
			if (parsedObj.errorStatus){
				cb(parsedObj.errorStatus.longMessage)
			}
			//var result = {}
			//result.rawObj = parsedObj
			//result.annotations = parsedObj.success.data[0].annotatorResultBean[0].annotations[0].annotationBean //.annotatorResultBean.annotations.annotationBean

			//console.log('result:', result)
			if (typeof cb === 'function'){
				cb(null, {annotations: parsedObj.success.data[0].annotatorResultBean[0].annotations[0].annotationBean})
			} else {
				return {annotations: parsedObj.success.data[0].annotatorResultBean[0].annotations[0].annotationBean}
			}
		})*/
	})
}

module.exports = {
	getAnnotations: getAnnotations,
	params: params
}