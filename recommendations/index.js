const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const KeyWordExtractor = require('./src/keywordExtractor'); 


// @ts-ignore
const Crawler = require("crawler");

const app = express(); 

app.use(bodyParser.json());
app.use(cors()); 


let c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});

app.post('/recommendations', (req, res) => {

    // First, grab the user input from the http request body
    const TextInput =  req.body.textInput; 
    console.log(TextInput);

    // Next, clean the user input to remove stopwords and 
    // punctuation 

    c.queue(['https://plato.stanford.edu/entries/time/', 'https://plato.stanford.edu/entries/time-thermo/']);

    const keywords = KeyWordExtractor.getKeywords(TextInput);

    console.log(keywords);

    res.send({}); 

}); 

app.listen(4000, () => {
    console.log('listening on port 4000');
})