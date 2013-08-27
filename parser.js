var an = require('./annotator'),
	_ = require('lodash')
	
function getTerms(text, cb){
// Get simple list of terms that matched

	var terms
	
	an.params['levelMax'] = 0
	
	an.getAnnotations(text, function(err, result){

		terms = result.annotations.map(function(item){ return concept[0].context[0].term[0].concept[0].preferredName[0]})

		//console.log(terms)
		cb(null, terms)
	})
}
function getAnnotations(text, cb){
	
	var contexts = []

	an.params['levelMax'] = 3
	
	an.getAnnotations(text, function(err, result){

		_.forEach(result.annotations, function(val, index){
				term = {}
			if (val.context[0].contextName[0] === 'CLOSURE'){
				term.term = val.context[0].concept[0].preferredName[0]
				term.from = parseInt(val.context[0].from[0])
				term.to = parseInt(val.context[0].to[0])
				term.isA = val.concept[0].preferredName[0]
				term.link = val.context[0].concept[0].fullId[0]
			} else { // others I know of are mgrepContextBean - seems to mean it does not have is_a closure info
				term.term = val.context[0].term[0].concept[0].preferredName[0]
				term.from = parseInt(val.context[0].from[0])
				term.to = parseInt(val.context[0].to[0])
				term.link = val.context[0].term[0].concept[0].fullId[0]
			}
				
			contexts.push(term)
		})
		
		//console.log(contexts)
		cb(null, contexts)
	})
}

module.exports = {
	getTerms: getTerms,
	getAnnotations: getAnnotations
}