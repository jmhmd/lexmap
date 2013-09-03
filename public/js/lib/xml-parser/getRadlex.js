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

        if (!files.length) {
            cb('Please select a file!')
            return false
        }

        reader.onloadend = function(e) {
            cb(null, extractXML(e.target.result))
        }

        reader.readAsText(files[0])
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

        resultText += "<table border='1'>"
        for (var i=0;i<x.length;i++){
            //Begin Table
            resultText += "<tr>"

            //1st Column: field-->name
            resultText += "<td> "
            resultText += x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue
            resultText += " </td>"

            switch(x[i].getAttribute("type")) {

                case "1":
                    break
                case "2":
                    break
                case "3":
                    //2nd Column: field -->choices
                    for (var j=0;j<x[i].getElementsByTagName("choice").length;j++) {
                        resultText += '<td> '
                        resultText += x[i].getElementsByTagName("choice")[j].childNodes[0].nodeValue
                        resultText += " </td>"

                        //If there is more than 1 choice, add another row
                        if ( j < x[i].getElementsByTagName("choice").length - 1) {
                            resultText += "<tr><td></td>"
                        }
                    }
                    break
                case "4":
                    break

                resultText += "</tr>"        //End table
            }
        }
        resultText += "</table>"

        return resultText
    }

    return {
        parseFiles: parseFiles
    }
}