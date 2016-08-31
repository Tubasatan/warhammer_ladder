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

function makeCorsRequest(url) {

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        var data = JSON.parse(xhr.responseText);
        var tableData = getTableData(data);
        var table = buildTable(tableData);
        document.getElementById('scoreboard').appendChild(table)

        //var bars = buildBars(tableData);
        //document.getElementById('bars').appendChild(bars);

    };

    xhr.onerror = function() {
        alert('Woops, there was an error making the request.');
    };

    xhr.send();

}

function getTableData(data) {
    console.log(data);
    console.log(data.feed.entry);
    var entries = data.feed.entry;

    var tableData = [];
    var numbers = [];

    for (var i = 0; i < entries.length; i++) {
        var name = entries[i].gsx$name.$t
        var score = entries[i].gsx$score.$t

        tableData.push([name, score])
    }

    //The google doc should be sorting things correctly
    //This code will sort it as well just to be sure

    //sort tableData based on the score value
    tableData.sort(function(a, b){
        var valueA, valueB;

        valueA = a[1];
        valueB = b[1];

        return valueB - valueA
    });
    //console.log(tableData);

    return tableData
}

function buildTable(tableData) {
    //build a table using the data

    //tableData = [['john','10'],['jenny','19']]
    // Create the table
    var table = document.createElement('table');

    // create the haeaders for the table
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');

    var header1 = document.createTextNode('Placement');
    var header2 = document.createTextNode('General');
    var header3 = document.createTextNode('Total Score');

    th1.appendChild(header1);
    th2.appendChild(header2);
    th3.appendChild(header3);

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);

    table.appendChild(tr);

    // fill the table with content
    for (var i = 0; i < tableData.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');

        var text1 = document.createTextNode('#' + (i + 1));
        var text2 = document.createTextNode(tableData[i][0]);
        var text3 = document.createTextNode(tableData[i][1]);

        td1.appendChild(text1);
        td2.appendChild(text2);
        td3.appendChild(text3);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        table.appendChild(tr);
        // set its contents
        //item.appendChild(document.createTextNode(tableData[i].join(' ')));
    }

    // finally return the constructed table
    return table;
}

var url = 'https://spreadsheets.google.com/feeds/list/14NrIk-FFVg0xoMcO81ga-7-7eHTkQDAjs__MiYl6SK8/od6/public/values?alt=json';
makeCorsRequest(url);
