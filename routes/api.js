/*
 * Serve JSON to our AngularJS client
 */

var parser = require('../parser')

exports.getTerms = function (req, res) {
	var type = req.params.type

	if (type === 'terms'){
		parser.getTerms(req.body.text, req.body.ontologies, function(err,terms){
			res.send('200',terms)
		})
	} else if (type === 'annotations'){
		parser.getAnnotations(req.body.text, req.body.ontologies, function(err,contexts){
			res.send('200',contexts)
		})
	} else if (type === 'frequencies'){
		/* not fully ported from python yet, don't know if i'll even need


		// make request for annotations on block of concatenated reports
		parser.getTerms(req.query.text, function(err,terms){
			// build list of term frequencies
			var frequencies = {}
			
			for term in terms:
				if frequencies.has_key(term):
					frequencies[term] += 1
				else:
					frequencies[term] = 1
			
			// sort term frequency dict by term frequency, descending
			from operator import itemgetter
			sortedTerms = sorted(frequencies.iteritems(), key=itemgetter(1))
			
			if sort == 'desc':
				sortedTerms.reverse()
			
			return json.dumps(sortedTerms)		
		})
		*/	
	} else {
		res.send('404')
	}
}