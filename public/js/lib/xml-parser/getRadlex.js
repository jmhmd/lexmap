'use strict';

/**
 * Created with JetBrains WebStorm.
 * User: JJM
 * Date: 8/15/13
 * Time: 8:00 PM
 * To change this template use File | Settings | File Templates.
 */

function XmlParser(){

    function parseFiles(files, cb){

        var reader = new FileReader()

        if (files == undefined) {
            alert('No file selected!')
        }
        else {
            reader.onloadend = function(e) {
                cb(null, extractXML(e.target.result))
            }
            
        reader.readAsText(files[0])
        }
    }

    function extractXML(fileData)  {
        var file = new DOMParser(),
            parser = file.parseFromString(fileData, "text/xml"),
            wrapper = parser.getElementsByTagName("ContentRTF"),
            dataXML = wrapper[0].childNodes[0].nodeValue.slice(wrapper[0].childNodes[0].nodeValue.indexOf("utf-8")+8, wrapper[0].childNodes[0].nodeValue.length, "text/xml")
        
        return parseXML(dataXML)
    }

    function parseXML(fileData) {
        var file = new DOMParser(),
            parser = file.parseFromString(fileData, "text/xml"),
            x = parser.getElementsByTagName("field"),
            resultText = ''

        for (var i=0;i<x.length;i++){

            resultText += x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + " "

            if(x[i].getAttribute("type") == 3) {
                for (var j=0;j<x[i].getElementsByTagName("choice").length;j++) {
                    console.log(j + " " + x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue + " ")
                    console.log(x[i].getElementsByTagName("choice")[j].childNodes[0].nodeValue + " ")
                    resultText += x[i].getElementsByTagName("choice")[j].childNodes[0].nodeValue + " "

                }
            }
        }

        return resultText
    }

    return {
        parseFiles: parseFiles
    }
}