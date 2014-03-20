var request = require('request'),
	memwatch = require('memwatch'),
	fs = require('fs')

memwatch.on('leak', function(info) { 
	console.log(info)
})

//API_KEY= '24e050ca-54e0-11e0-9d7b-005056aa3316'
var API_KEY= '5758f84b-562e-46cb-890b-ff787cc52bed',
	annotatorUrl = 'http://data.bioontology.org/annotator'
	//submitUrl = annotatorUrl + '/submit/jhostetter@gmail.com'

var textToAnnotate = "Melanoma is a malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye"

/*---------------------
// virtual ontology ids:
// Radlex: 1057/50767
// LOINC: 1350/47637
// SNOMED: 1353/46896
*/
var params = {
		'stop_words':'',
		'minimum_match_length':'', 
		'ontologies':'RADLEX, LOINC, SNOMEDCT',   
		'semantic_types':'',  //T017,T047,T191&" #T999&"
		'max_level':'0',
		'text': textToAnnotate, 
		'apikey': API_KEY
	}

getAnnotations = function (text, cb) {
	var result = [],
		testing = false

	params.text = text || params.textToAnnotate
	
	//var hd = new memwatch.HeapDiff()
	// Submit job
	
	/**
	 * Post request to JSON API
	 */

	console.log('querying api...')
	request.post(annotatorUrl, {form: params}, function(err, res, body){

		if (testing){
			fs.writeFile('./annotation_result.js', body)
		}

		body = JSON.parse(body)

		body.forEach(function(match){

			var term = {},
				an = match.annotations[0]

			term.term = an.text
			term.from = an.from
			term.to = an.to
			term.isA = an.matchType
			term.link = match.annotatedClass.links.ui
			term.ontology = match.annotatedClass.links.ontology.split('/').pop()
				
			result.push(term)
		})

		console.log('finished parsing')

		//fs.writeFile('./annotation_result.js', JSON.stringify(result))

		if (typeof cb === 'function'){
			cb(null, result)
		} else {
			return result
		}

	})


	
/*
	var fileStream = request.post(submitUrl, {form: params})

	var parser = xml.parse(fileStream)

	parser.each('annotationBean', function(val){
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
		console.log('finished parsing')

		if (typeof cb === 'function'){
			cb(null, result)
		} else {
			return result
		}
		//var diff = hd.end()
		//console.log('diff: ', diff, diff.change.details)
	})*/

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