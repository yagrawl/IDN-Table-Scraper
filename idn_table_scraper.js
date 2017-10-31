var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res){

url = 'https://www.iana.org/domains/idn-tables';

var idn_table = [];

request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var tld, registry, set, type, version, date, url;

    $('.avoid-break').each(function(i, elem){
        var json = { tld : "", registry : "", set : "", type : "",
                 version : "", date : "", url : ""};
        var data = $(this);
        var temp = data.parent().text().split('\n');
        var url = data.parent().children().first().html();
        url = url.toString()
        url = url.substring(9, url.indexOf('>') - 1);
        var tld_temp = temp[1].split(' '); 
        
        tld = tld_temp[0].replace('\t\t', '');
        set = tld_temp[1].replace('\t\t', ''); 
        registry = temp[5].replace('\t\t', '');
        type = temp[2].replace('\t\t', '');
        version = temp[3].replace('\t\t', '');
        date = temp[4].replace('\t\t', '');        
        
        json.tld = tld;
        json.set = set;
        json.registry = registry;
        json.type = type;
        json.version = version;
        json.date = date;
        json.url = url;
        idn_table.push(json);
    })

}

fs.writeFile('output.json', JSON.stringify(idn_table, null, 4), function(err){

    console.log('File successfully written! - Check project directory -> output.json file');

})

res.send('Check console!')

    }) ;
})

app.listen('8081')
console.log('Open port 8081 -> http://localhost:8081/scrape');
exports = module.exports = app;