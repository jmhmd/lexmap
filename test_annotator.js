"use strict";

var a = require('./annotator'),
	async = require('async'),
	fs = require('fs')

var ontologies = '1057,1350,1353'

a.params['ontologiesToExpand'] = ontologies
a.params['ontologiesToKeepInResult'] = ontologies

var inputText = 'Specific procedure type Subcutaneous port insertion Tunneled central venous catheter insertion Non-tunneled central venous catheter insertion Peripherally inserted central catheter insertion Order Date Institution Name Memorial Sloan-Kettering Cancer Center University of California, San Francisco M.D. Anderson Cancer Center Patient MRN Patient DOB Patient Gender Signer Name IR Fellow Name Resident Name Mid-level Provider Name Diagnosis Breast cancer Lymphoma Acute renal failure Chronic renal failure Healthy donor Colorectal cancer Hepatocellular carcinoma Prostate cancer Indications Prior imaging/comparison None Study description (study type, date, findings) Access method Ultrasound guided Palpation guided Anatomic landmark guided Side Right Left Midline Other (specify) Vein accessed internal jugular vein subclavian vein common femoral vein basilic vein brachial vein inferior vena cava superior vena cava collateral vein other (specify) Image-guidance Fluoroscopically Ultrasound Anatomic landmark Specific device type subcutaneous port tunneled central venous catheter non-tunneled central venous catheter peripherally inserted central catheter Complications/Events Patency Patent Partially occluded Occluded Vein accessed internal jugular vein subclavian vein common femoral vein basilic vein brachial vein inferior vena cava superior vena cava collateral vein other (specify) Other observations (may be blank) Catheter tip location Catheter tip location: Cavoatrial junction Catheter tip location: Right atrium Catheter tip location: Superior vena cava Catheter tip location: Suprarenal inferior vena cava Catheter tip location: Infrarenal inferior vena cava Other observations (may be blank) Side Right Left Midline Other (specify) Vein accessed internal jugular vein subclavian vein common femoral vein basilic vein brachial vein inferior vena cava superior vena cava collateral vein other (specify) Specific device type subcutaneous port tunneled central venous catheter non-tunneled central venous catheter peripherally inserted central catheter Additional summary statement (may be blank) Specific device type Subcutaneous port Tunneled central venous catheter Non-tunneled central venous catheter Peripherally inserted central catheter Consenting Individual Patient Patient Surrogate Time-out performed Yes No Anesthesia type Moderate sedation Local anesthesia Monitored anesthesia care General anesthesia Regional anesthesia None Other (specify) Moderate sedation time/attestation (may be blank) Moderate sedation time (may be blank) Antibiotic list None Cefazolin Cefotetan Cefixime Ceftriaxone Ciprofloxacin Vancomycin Ampicillin Ampicillin/sulbactam Gentamicin Clindamycin Doxycycline Pieracilllin/tazobactam Mezlocillin Aztreonam Imipenem Other (specify) Dose Route of administration IV PO IM IA subcutaneous sublingual per rectum intradermal intrathecal via catheter via needle Other (specify) Second antibiotic if applicable - antibiotic list None Cefazolin Cefotetan Cefoperazone Cefoxitin Cefixime Ceftriaxone Ciprofloxacin Vancomycin Ampicillin Ampicillin/sulbactam Gentamicin Clindamycin Doxycycline Pieracilllin/tazobactam Mezlocillin Ticarcillin Penicillin Aztreonam Imipenem Other (specify) Dose Route of administration IV PO IM IA subcutaneous sublingual per rectum intradermal intrathecal via catheter via needle Other (specify) Antibiotic administration time Not applicable Administered within 1 hour of procedure start time. Administered greater than 1 hour before procedure start time. Other (specify) Common medication list Midazolam Fentanyl Demerol Diazepam Diphenhydramine Hydroxyzine Propofol Metoprolol Nitroglycerine Enalapril Nitroprusside Furosemide Hydralazine Amlodipine Lidocaine Epinephrine Flumazenil Naloxone Heparin Protamine Vasopressin Magnesium Atropine Dopamine Adenosine Diltiazem Digoxin Verapamil Glucose (D50) Labetalol Nicardipine Aspirin Clopidogrel Glucagon Morphine Hydromorphone Prednisone Butorphanol tartrate Nalbuphine Warfarin Droperidol Scopolamine Meclizine Ondansetron Chlorpromazine Prochlorperazine Promethazine Metaclopramide Ketorolac Ibuprofen Tylenol Tissue plasminogen activator Abciximab Reteplase Methylprednisolone Eptifibatide Ticlodipine Tolazoline Urokinase Streptokinase Alcohol (98%) Betadine Tetracycline Talc None Other (specify) Dose Route of administration IV PO IM IA subcutaneous sublingual per rectum intradermal intrathecal via catheter via needle Other (specify) Local anesthesia 1% subcutaneous lidocaine without epinephrine: 1% subcutaneous lidocaine with epinephrine: Other (specify) None Volume in ml 1 ml 2 ml 3 ml 4 ml 5 ml 6 ml 7 ml 8 ml 9 ml 10 ml 15 ml 20 ml Other (specify) Contrast agent None Omnipaque iodinated Visipaque iodinated Isopaque iodinated Hexabrix iodinated Isovue iodinated Oxilan iodinated Ultravist iodinated Hypaque Barium Eovist gadolinium Omniscan gadolinium Dotarem gadolinium Multihance gadolinium Prohance gadolinium Optimark gadolinium Primovist gadolinium Gadovist gadolinium Ablavar gadolinium Carbon dioxide Normal saline Air FDG Dose/Strength Route of administration IV PO IM IA subcutaneous sublingual per rectum intradermal intrathecal via catheter via needle Other (specify) Patient position Supine Prone Right side down decubitus Left side down decubitus Partial right side down decubitus Partial left side down decubitus Supine Trendelenburg Supine reverse Trendelenburg Sitting Imaging guidance Ultrasound with permanent image storage Ultrasound without permanent image storage Imaging guidance not utilized Fluoroscopy CT MRI Endoscopy Laparoscopy Other (specify) Imaging guidance Fluoroscopy Ultrasound with permanent image storage Ultrasound without permanent image storage Imaging guidance not utilized CT MRI Endoscopy Laparoscopy Other (specify) Side Right Left Midline Other (specify) Vein accessed internal jugular vein subclavian vein common femoral vein basilic vein brachial vein inferior vena cava superior vena cava collateral vein other (specify) Vascular access needle 21 gauge micropuncture needle 18 gauge needle single wall needle 18 gauge needle double wall needle 20 gauge needle single wall needle 16 gauge needle single wall needle Equipment inventory Standard equipment provided in central venous access device kit Standard equipment provided in central venous access device kit and the following: Additional equipment inventory Yes/No field Yes No French size Name/Brand Vaccess Med-comp Palindrome Low-profile Hickman Tesio Venous access device type subcutaneous port hemodialysis catheter central venous catheter peripherally inserted central venous catheter (PICC) Number of lumens 1 2 3 4 Yes/No field Yes No Suture size 0-0 1-0 2-0 3-0 4-0 5-0 6-0 7-0 8-0 9-0 10-0 Not applicable Other (specify) Suture type Absorbable monocryl Absorbable vicryl Absorbable chromic Absorbable PDS Non-absorbable prolene Non-absorbable nylon Non-absorbable gortex Non-absorbable silk Non-absorbable ethibond Non-absorbable fiberwire Suture technique running interrupted other (specify) Suture location buried intradermal subcuticular other (specify) Additional skin closure devices Dermabond glue Steri-strips Staples None Other (specify) Free text option Volume Flush type None heparin (100 units/ml) heparin (1000 units/ml) normal saline solution (0.9%) citrate Needle quantity Single Dual Device access needle Not applicable power-injectable Huber needle non-power injectable Huber needle Not accessed Other (specify) Blood loss volume Minimal (less than 10) 15 20 25 30 40 50 Other (specify) Numeric dose Dose units mGy Not applicable Not available Numeric dose Dose units Gy·cm2 Not applicable Not available Fluoroscopy time Enter time Not applicable Not available Time units seconds minutes and seconds attestation presence entire key portions of the antisepsis agent ChloraPrep (2% chlorhexidine + 70% isopropyl alcohol) 2% chlorhexidine povidone-iodine 70% isopropyl alcohol betadine parachoroxylenol Free text option'
var textArray = inputText.split(' ')

var i = 1
var increment = 5
var maxWords = 100
var resultHeaders = ['words', 'matched', 'query time', 'request time', 'parse time']
var results = []
var totalStart = new Date()

var sendQuery = function(cb){

	if (i % increment !== 0){
		i++
		return cb()
	}

	console.log('querying with '+i+' words...')

	var queryStart = new Date()

	// add words on each loop
	var textToParse = textArray.slice(0,i).join(' ')

	a.getAnnotations(textToParse, function(err, matched, reqTime, parseTime){
		if (err){ cb(err) }
		//else if (matched.length === 0){ cb('empty result') }
		else {
			var queryEnd = new Date()
			results.push([
					i,
					matched.length,
					new Date(queryEnd-queryStart).getTime() / 1000,
					reqTime,
					parseTime
				])
			i++
			cb()
		}
	})
}

async.whilst(function(){ return i <= maxWords && i <= textArray.length }, sendQuery, function(err){
	if (err){ console.log(err) }

	var csv = resultHeaders.join(',') + '\n'

	results.forEach(function(val){
		csv = csv + val.join(',') + '\n'
	})

	fs.writeFile('./test/' + maxWords + '_words_' + ontologies.split(',').join('-') + '_parsed' + '-' + (+new Date()).toString(36) + '.csv', csv, function(err){
		if (err){ console.log(err) }
		console.log('wrote output to file')
	})
})