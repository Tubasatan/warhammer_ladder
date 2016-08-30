function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed.";
}

//get the json data from the google spreadsheet
// spreadsheet url: https://docs.google.com/spreadsheets/d/14NrIk-FFVg0xoMcO81ga-7-7eHTkQDAjs__MiYl6SK8/pubhtml 

//Read the json data containing the ladder info
//var theUrl = 'data/locations.json'

//var url = 'https://docs.google.com/spreadsheets/d/14NrIk-FFVg0xoMcO81ga-7-7eHTkQDAjs__MiYl6SK8/pubhtml'
//var url = 'https://docs.google.com/spreadsheets/d/

//https://spreadsheets.google.com/feeds/list/14NrIk-FFVg0xoMcO81ga-7-7eHTkQDAjs__MiYl6SK8/od6/public/values?alt=json


/*
var request = new XMLHttpRequest();
request.open('GET', theUrl, true);

request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        //Success!
        var data = JSON.parse(request.responseText);

        //prints the data to the console
        console.log(data)

        //do stuff with the data here
    } else {
        //We reached our target server, but it returned an error
    }
};

request.onerror = function() {
    //There was a connection error of some sort
};

request.send();
*/

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {

        // Check if the XMLHttpRequest object has a "withCredentials" property.
        // "withCredentials" only exists on XMLHTTPRequest2 objects.
        xhr.open(method, url, true);

    } else if (typeof XDomainRequest != "undefined") {

        // Otherwise, check if XDomainRequest.
        // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
        xhr = new XDomainRequest();
        xhr.open(method, url);

    } else {

        // Otherwise, CORS is not supported by the browser.
        xhr = null;

    }
    return xhr;
}


function makeCorsRequest() {
    // This is a sample server that supports CORS.
    var url = 'https://spreadsheets.google.com/feeds/list/14NrIk-FFVg0xoMcO81ga-7-7eHTkQDAjs__MiYl6SK8/od6/public/values?alt=json';

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var text = xhr.responseText;
        console.log(text)
    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();
}
