var request = require('request'),
	//xmlParser = require('xml2js').parseString,
	xml = require('xml-object-stream'),
	memwatch = require('memwatch'),
	fs = require('fs')

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
// Radlex: 1057/50767
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
		// 'ontologiesToExpand':'1057,1350,1353',   
		// 'ontologiesToKeepInResult':'1057,1350,1353',   
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
	var result = [],
		testing = false
	
	params.textToAnnotate = text || params.textToAnnotate
	
	//var hd = new memwatch.HeapDiff()
	// Submit job
	console.log('querying api...')
	
	if (testing){
		request.post(submitUrl, {form: params}, function(err, res, body){
			fs.writeFile('./annotation_result.txt', body)
		})
		return false
	}

	var startRequest = new Date(),
		startParse = false,
		endParse = false

	var fileStream = request.post(submitUrl, {form: params})

	var parser = xml.parse(fileStream)

	parser.each('annotationBean', function(val){
		if (!startParse){ startParse = new Date() }

		var term = {}
		if (val.context.contextName.$text === 'CLOSURE'){
			term.term = val.context.concept.preferredName.$text
			term.from = parseInt(val.context.from.$text)
			term.to = parseInt(val.context.to.$text)
			term.isA = val.concept.preferredName.$text
			term.link = val.context.concept.fullId.$text
			term.ontology = val.concept.localOntologyId.$text
		} else { // others I know of are mgrepContextBean - seems to mean it does not have is_a closure info
			term.term = val.context.term.concept.preferredName.$text
			term.from = parseInt(val.context.from.$text)
			term.to = parseInt(val.context.to.$text)
			term.link = val.context.term.concept.fullId.$text
			term.ontology = val.context.term.concept.localOntologyId.$text
		}
			
		result.push(term)
	})

	parser.on('error', function(err){
		console.log('Error: ', err)
	})

	parser.on('end', function(){
		endParse = new Date()

		var reqTime = new Date(startParse-startRequest).getTime() / 1000,
			parseTime = new Date(endParse-startParse).getTime() / 1000

		console.log('finished parsing')

		if (typeof cb === 'function'){
			cb(null, result, reqTime, parseTime)
		} else {
			return result
		}
		//var diff = hd.end()
		//console.log('diff: ', diff, diff.change.details)
	})

/*
	request.post(submitUrl, {form: params}, function(error, response, body){
		if (error){
			console.log(error)
			return new Error(error)
		}
		
		fs.writeFile('./annotation.txt', response.body)

		if (typeof cb === 'function'){
			cb(null, {annotations: response.body})
		} else {
			return {annotations: response.body}
		}

		var diff = hd.end()
		console.log('diff: ', diff, diff.change.details)
	})*/
}

module.exports = {
	getAnnotations: getAnnotations,
	params: params
}