/**
 * Created with JetBrains WebStorm.
 * User: JJM
 * Date: 8/15/13
 * Time: 8:00 PM
 * To change this template use File | Settings | File Templates.
 */

function pushButton(){

    var files = document.getElementById('files').files;
    var reader = new FileReader();

    if (!files.length) {
        alert('Please select a file!');
        return;
    }

    reader.onloadend = function(e) {
        extractXML(e.target.result);
    }
    reader.readAsText(files[0]);
}

function extractXML(fileData)  {
    file = new DOMParser();

    parser = file.parseFromString(fileData, "text/xml");

    var wrapper = parser.getElementsByTagName("ContentRTF");
    var dataXML = wrapper[0].childNodes[0].nodeValue.slice(wrapper[0].childNodes[0].nodeValue.indexOf("utf-8")+8, wrapper[0].childNodes[0].nodeValue.length, "text/xml")
    parseXML(dataXML);

}

function parseXML(fileData) {
    file = new DOMParser();

    parser = file.parseFromString(fileData, "text/xml");

    var x = parser.getElementsByTagName("field");
    document.write("<table border='1'>");
    for (i=0;i<x.length;i++)
    {
        //Begin Table
        document.write("<tr>");

        //1st Column: field-->name
        document.write("<td>");
        document.write(x[i].getElementsByTagName("name")[0].childNodes[0].nodeValue);
        document.write("</td>");

        switch(x[i].getAttribute("type")) {

            case "1":
                break;
            case "2":
                break;
            case "3":
                //2nd Column: field -->choices
                for (j=0;j<x[i].getElementsByTagName("choice").length;j++) {
                    document.write("<td>");
                    document.write(x[i].getElementsByTagName("choice")[j].childNodes[0].nodeValue.fontcolor("red"));
                    document.write("</td>")

                    //If there is more than 1 choice, add another row
                    if ( j < x[i].getElementsByTagName("choice").length - 1) {
                        document.write("<tr><td></td>");
                    }
                }
                break;
            case "4":
                break;

            document.write("</tr>");        //End table
        }
    }
    document.write("</table>");
}