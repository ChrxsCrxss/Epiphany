const express = require('express');
const bodyParser = require('body-parser');
const axios = require("axios");
const cors = require('cors');
const KeyWordExtractor = require('./src/keywordExtractor');

/**
 * In order to use async/wait syntax, we promisify
 * asynchronous redis operations using bluebird 
 */
const bluebird = require('bluebird'); 
const redis = require('redis');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

//configure redis client on port 6379
const port_redis = process.env.PORT || 6379;
const redis_client = redis.createClient(port_redis);

// configure express instance
const app = express();
app.use(bodyParser.json());
app.use(cors());


// @ts-ignore
const Crawler = require("crawler");
let crawler = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: (error, res, done) => {

        if (error) {
            console.log(error);
        } else {

            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            const title = $("title").text();

            // Each article url is listed as a result_url object 
            const SEP_ARTICLE_URL_ENDPT = `https://plato.stanford.edu/entries/`;
            const SEP_URLS = $('.result_url')

                // First get the text. This returns a string, with each
                // url seperated by a newline character 
                .text()

                // Next, split on the newline character to produce an 
                // array of urls
                .split('\n')

                // Finally, filter our extraneous elements 
                .filter(url => url.includes(SEP_ARTICLE_URL_ENDPT)); ;



            for (url of SEP_URLS) {
                redis_client.zadd('url_sset', 'INCR', '1', `${url}`), (err, res) => {
                    redis_client.zrank('url_sset', url, (err, res) => {
                        console.log(res)
                    });
                }

            }

        }
        done();
    }
});



app.post('/recommendations', async (req, res) => {

    // First, grab the user input from the http request body
    const TextInput = req.body.textInput;
    console.log(`Raw http body:\n${TextInput}`);

    // Next, clean the user input to remove stopwords and punctuation 
    const keywords = KeyWordExtractor.getKeywords(TextInput);
    console.log(`keywords:\n${[...keywords]}`);

    const SEP_SEARCH_ENDPOINT = `https://plato.stanford.edu/search/search?query=`;

    const SEP_QUERY_ARRAY = [];

    for (let word of keywords) {
        SEP_QUERY_ARRAY.push(`${SEP_SEARCH_ENDPOINT}${word}`)
    }

    const passed_res = res; 
    /**
     * The callback function emmited when the crawler queue is empty. 
     * Return the top matches to the client using the res object
     * @param {*} res The http response object 
     */
    const onCrawlEnd = async (res = passed_res) => {
        
        const response = await redis_client.zrevrangeAsync('url_sset', 0, -1);

        console.log(response);

        res.send(response); 
    }

    // , (err, redis_res) => {
    //     console.log(redis_res);
        

    //     crawler.queue( redis_res.slice(0,10), () => ); 

    // }

    // res.json({
    //     results : redis_res.slice(0,10),
    // }); 
    

    crawler.queue(SEP_QUERY_ARRAY);

    // Emitted when queue is empty, i.e. when all requests are processed
    crawler.on('drain', () => onCrawlEnd());




});



app.listen(4000, () => {
    console.log('listening on port 4000');
})