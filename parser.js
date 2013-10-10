var an = require('./annotator'),
	_ = require('lodash')
	
function getTerms(text, ontologies, cb){
// Get simple list of terms that matched

	var terms
	
	an.params['levelMax'] = 0
	an.params['ontologiesToExpand'] = ontologies.join(',')
	an.params['ontologiesToKeepInResult'] = ontologies.join(',')
	
	an.getAnnotations(text, function(err, result){

		terms = result.annotations.map(function(item){ return concept.context.term.concept.preferredName.$text})

		//console.log(terms)
		cb(null, terms)
	})
}
function getAnnotations(text, ontologies, cb){
	
	var contexts = []

	an.params['levelMax'] = 3
	an.params['ontologiesToExpand'] = ontologies.join(',')
	an.params['ontologiesToKeepInResult'] = ontologies.join(',')
	
	an.getAnnotations(text, function(err, result){
		//console.log(contexts)
		cb(null, result)
	})
}

module.exports = {
	getTerms: getTerms,
	getAnnotations: getAnnotations
}