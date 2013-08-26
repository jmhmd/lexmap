var request = require('request'),
	xmlParser = require('xml2js').parseString

//API_KEY= '24e050ca-54e0-11e0-9d7b-005056aa3316'
var API_KEY= '5758f84b-562e-46cb-890b-ff787cc52bed',
	annotatorUrl = 'http://rest.bioontology.org/obs/annotator',
	submitUrl = annotatorUrl + '/submit/jhostetter@gmail.com'

var textToAnnotate = "Melanoma is a malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye"

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
		'ontologiesToExpand':'1057',   
		'ontologiesToKeepInResult':'1057',   
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
	
	// Submit job
	request.post(submitUrl, {form: params}, function(error, response, body){
		if (error){
			return new Error(error)
		}

		xmlParser(response.body, function(err, parsedObj){
			if (error){
				return new Error(error)
			}
			if (parsedObj.errorStatus){
				return new Error(parsedObj.errorStatus.longMessage)
			}
			var result = {}
			result.rawObj = parsedObj
			result.annotations = result.rawObj.success.data[0].annotatorResultBean[0].annotations[0].annotationBean //.annotatorResultBean.annotations.annotationBean

			//console.log('result:', result)
			if (typeof cb === 'function'){
				cb(null, result)
			} else {
				return result
			}
		})
	})
}

module.exports = {
	getAnnotations: getAnnotations,
	params: params
}