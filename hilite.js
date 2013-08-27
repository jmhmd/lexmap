'use strict';

var terms = [
  {
    "term": "malignant",
    "from": 43,
    "to": 51,
    "isA": "RadLex entity",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID15655"
  },
  {
    "term": "neoplasm",
    "from": 53,
    "to": 57,
    "isA": "pathophysiologic finding",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID3957"
  },
  {
    "term": "embolization",
    "from": 30,
    "to": 41,
    "isA": "RadLex entity",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID10404"
  },
  {
    "term": "melanoma",
    "from": 1,
    "to": 8,
    "isA": "pathophysiologic finding",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34617"
  },
  {
    "term": "melanoma",
    "from": 1,
    "to": 8,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34617"
  },
  {
    "term": "uterine artery embolization",
    "from": 15,
    "to": 41,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID1817"
  },
  {
    "term": "eye",
    "from": 142,
    "to": 144,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34550"
  },
  {
    "term": "embolization",
    "from": 30,
    "to": 41,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID10404"
  },
  {
    "term": "uterine artery",
    "from": 15,
    "to": 28,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID955"
  },
  {
    "term": "skin",
    "from": 107,
    "to": 110,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34290"
  },
  {
    "term": "artery",
    "from": 23,
    "to": 28,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID478"
  },
  {
    "term": "malignant",
    "from": 43,
    "to": 51,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID15655"
  },
  {
    "term": "uterine artery",
    "from": 15,
    "to": 28,
    "isA": "branch of anterior division of internal iliac artery",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID955"
  },
  {
    "term": "eye",
    "from": 142,
    "to": 144,
    "isA": "subdivision of face",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34550"
  },
  {
    "term": "melanoma",
    "from": 1,
    "to": 8,
    "isA": "malignant neoplastic disease",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34617"
  },
  {
    "term": "neoplasm",
    "from": 53,
    "to": 57,
    "isA": "proliferation",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID3957"
  },
  {
    "term": "malignant",
    "from": 43,
    "to": 51,
    "isA": "aggressiveness descriptor",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID15655"
  },
  {
    "term": "intestine",
    "from": 128,
    "to": 132,
    "isA": "subdivision of gut",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID130"
  },
  {
    "term": "uterine artery embolization",
    "from": 15,
    "to": 41,
    "isA": "uterus surgery",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID1817"
  },
  {
    "term": "artery",
    "from": 23,
    "to": 28,
    "isA": "segment of arterial tree organ",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID478"
  },
  {
    "term": "embolization",
    "from": 30,
    "to": 41,
    "isA": "procedure",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID10404"
  },
  {
    "term": "skin",
    "from": 107,
    "to": 110,
    "isA": "nonparenchymatous organ",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34290"
  },
  {
    "term": "intestine",
    "from": 128,
    "to": 132,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID130"
  },
  {
    "term": "neoplasm",
    "from": 53,
    "to": 57,
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID3957"
  },
  {
    "term": "malignant",
    "from": 43,
    "to": 51,
    "isA": "Radlex descriptor",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID15655"
  },
  {
    "term": "eye",
    "from": 142,
    "to": 144,
    "isA": "subdivision of head",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34550"
  },
  {
    "term": "uterine artery embolization",
    "from": 15,
    "to": 41,
    "isA": "genitourinary surgery",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID1817"
  },
  {
    "term": "artery",
    "from": 23,
    "to": 28,
    "isA": "region of vascular tree",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID478"
  },
  {
    "term": "uterine artery",
    "from": 15,
    "to": 28,
    "isA": "branch of internal iliac artery",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID955"
  },
  {
    "term": "melanoma",
    "from": 1,
    "to": 8,
    "isA": "neoplastic disease",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34617"
  },
  {
    "term": "intestine",
    "from": 128,
    "to": 132,
    "isA": "subdivision of gastrointestinal system",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID130"
  },
  {
    "term": "skin",
    "from": 107,
    "to": 110,
    "isA": "solid organ",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34290"
  },
  {
    "term": "eye",
    "from": 142,
    "to": 144,
    "isA": "subdivision of cardinal body part",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34550"
  },
  {
    "term": "intestine",
    "from": 128,
    "to": 132,
    "isA": "subdivision of alimentary system",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID130"
  },
  {
    "term": "artery",
    "from": 23,
    "to": 28,
    "isA": "organ segment",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID478"
  },
  {
    "term": "embolization",
    "from": 30,
    "to": 41,
    "isA": "Radlex ontology entity",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID10404"
  },
  {
    "term": "uterine artery",
    "from": 15,
    "to": 28,
    "isA": "systemic artery",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID955"
  },
  {
    "term": "skin",
    "from": 107,
    "to": 110,
    "isA": "organ",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID34290"
  },
  {
    "term": "neoplasm",
    "from": 53,
    "to": 57,
    "isA": "clinical finding",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID3957"
  },
  {
    "term": "uterine artery embolization",
    "from": 15,
    "to": 41,
    "isA": "surgical procedure",
    "link": "http://purl.bioontology.org/ontology/RADLEX/RID1817"
  }
]

var text = "Melanoma is a uterine artery embolization malignant tumor of melanocytes which are found predominantly in skin but also in the bowel and the eye"

var _ = require('lodash')

// return first non-space character index
function getNextStart(text, startIndex){
	var startIndex = startIndex || 0

	if (text.substr(startIndex, 1) != ' '){ return startIndex }

	var	nextSpace = text.indexOf(' ', startIndex),
		nextWord = nextSpace + 1

	while (text.substr(nextWord, 1) == ' '){
		nextWord += 1
	}

	return nextWord
}

// return first space character index
function getNextEnd(text, startIndex){
	var end = text.indexOf(' ', startIndex || 0)
	return end === -1 ? text.length : end
}

function getWords(text, startIndex, endIndex){
	var startIndex = startIndex || 0,
		endIndex = endIndex || text.length,
		words = []

	while (startIndex < endIndex) {
		var next = getNextStart(text, startIndex),
			end = getNextEnd(text, next)
		words.push([next, end])
		startIndex = end
	}

	return words
}

var newText = '',
	words = getWords(text)

var i = 1
terms = _.map(terms, function(term){
	term._id = i
	i++
	return term
})

var phrases = []
_.forEach(words, function(val, i){
	phrases[i] = []
	var classes = '',
		word = text.substr(val[0],val[1]-val[0])

	_.forEach(terms, function(term){
		if (val[0] === term.from - 1 || (val[0] > term.from - 1 && val[0] < term.to)){
			phrases[i].push(term._id)
			classes += 't_'+term._id+' '
		}
	})


	if (phrases[i].length > 0){
		newText += '<span id="w_'+i+'" class="'+classes+'">' + word + '</span> '

	} else {
		newText += word + ' '
	}
})

console.log(newText)
console.log(phrases)

// now loop through terms/phrases and apply styles/actions
/*
_.forEach(terms, function(term){
	$('.t_'+term._id)
		.css()
		.on('click', function(e){

		})
})
*/

//console.log(getWords(text))
//console.log(getWords(text).map(function(i){ return text.substr(i[0],i[1]-i[0]) }).join(' '))
