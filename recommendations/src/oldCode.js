const express = require("express");
const https = require("https");
const bodyParser = require("body-Parser");
const sw = require('stopword');
const request = require('request');
const cheerio = require('cheerio');





///////////////////////////////////////////////////////////////////////////////
/////////////////// Stanford Encyclopedia WebScraping Module //////////////////
///////////////////////////////////////////////////////////////////////////////

class KeywordCache {
    constructor(wordsArray = []) {
      this.keywordMap = new Map();
      this.insertKeywords(wordsArray);
    }
  
    getkeywordWeight(keyword) {
  
      if (typeof(keyword) !== 'string') throw 'keyword not a string';
      if (keyword === '') throw 'keyword is empty';
  
      if (this.keywordMap.has(keyword)) {
        return this.keywordMap.get(keyword);
      } else {
        throw 'keyword is not in cache';
      }
    }
  
    getkeywordMapSize() {
      return this.keywordMap.size;
    }
  
    isWordValid(word) {
      return typeof(word) === 'string' && word.length > 1;
    }
  
    insertKeywords(words) {
  
      for (let i = 0; i < words.length; ++i) {
  
        if (! this.isWordValid(words[i]) ) { continue; }
        // First check if the keywordMap already contains this word
        if (this.keywordMap.has(words[i])) {
          let newWeight = this.keywordMap.get(words[i]) + 1;
          this.keywordMap.set(words[i], newWeight);
        } else /* new keyword */ {
          this.keywordMap.set(words[i], 1);
        }
      }
  
    }
  
    listKeywords() {
      this.keywordMap.forEach(function(value, key) {
        console.log(key + " = " + value);
      })
    }
  
  }
  
  
  
  async function getRecommedations(keywordsArray) {
    let matchedUrlsMap = new Map();
    doKeywordSearch(keywordsArray, matchedUrlsMap);
  
    await new Promise(resolve => setTimeout(resolve, 5000));
  
    let topMatches = extractTopNMatches(10, matchedUrlsMap);
  
    console.log(topMatches);
  
    for (match of topMatches) {
      request(match[0], (error, response, html) => {
        if (!error && response.statusCode == 200) {
          let targetelem = 'h1';
          let title = getElemsFromCheerioObject(html, targetelem);
          console.log(title);
          targetelem = '#preamble p'
          let preamble = getElemsFromCheerioObject(html, targetelem);
          console.log(preamble);
          console.log('= = = = = = = = = = = = = = = = = = = = = = = = = = = =');
        } else {
          console.log(`Error`);
        }
      });
    }
  
  
  
  
  
    console.log('inside getRecommedations');
  }
  
  
  function extractTopNMatches(num, set) {
    let resultsArray = Array.from(set);
    resultsArray = sortDescendingOrder(resultsArray);
    let topNMatches = resultsArray.slice(0, num);
    return topNMatches;
  }
  
  
  function sortDescendingOrder(inputArray) {
    let tempArray = [];
    tempArray = tempArray.concat(inputArray);
    tempArray.sort(function(a, b) {
      return b[1] - a[1];
    });
    return tempArray;
  }
  
  async function doKeywordSearch(keywordsArray, matchedUrlsMap) {
  
    const SEP_SEARCH_ENDPOINT = `https://plato.stanford.edu/search/search?query=`;
    for (keyword of keywordsArray) {
      const sepQuery = `${SEP_SEARCH_ENDPOINT}${keyword}`;
      await fetchArticleHTML(sepQuery, matchedUrlsMap);
    }
  }
  
  async function fetchArticleHTML(sepQuery, matchedUrlsMap) {
  
    request(sepQuery, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        getUrls(response, html, matchedUrlsMap);
      } else {
        console.log(`Error`);
      }
    });
  }
  
  
  function getUrls(response, html, matchedUrlsMap) {
  
    const targetElem = '.result_url';
    let urlSuffixes = getElemsFromCheerioObject(html, targetElem);
  
    const resultURLs = buildSEPUrls(urlSuffixes);
  
    for (matchedURL of resultURLs) {
      hashItem(matchedURL, matchedUrlsMap);
    }
  
  };
  
  function getElemsFromCheerioObject(html, elem) {
    let $ = cheerio.load(html);
    let returnedElem = $(elem).text();
    return returnedElem;
  }
  
  function buildSEPUrls(urlSuffixes) {
    const SEP_ENTRY_PREFIX = `https://plato.stanford.edu/entries/`;
    /* First, we need to split the string on the newline character. There
       are double newline characters, but we split on singe newlines and
       follow up with a filter to keep processing the same for all URLs. */
    let rawUrlsArray = urlSuffixes.split("\n");
    const resultURLs = rawUrlsArray.filter(
      url => url.includes(SEP_ENTRY_PREFIX)
    );
    return resultURLs
  }
  
  
  function hashItem(item, hashmap) {
    // First check if the URL has already been encountered
    if (hashmap.has(item)) {
      let newVal = hashmap.get(item) + 1;
      hashmap.set(item, newVal);
    } else /* new URL entry */ {
      hashmap.set(item, 1);
    }
  }
  
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////

  function removePunctuation(wordsArray) {
    const cleanWords = wordsArray.map(
      word => word.replace(/[^a-z0-9+]+/gi, '')
    );
  
    // const cleanWords = withoutPuncArray.map(
    //   word => word.length > 1
    // )
    return cleanWords;
  }


    /* First thing to do is parse the http body. We then splict on space character
    and then strip it of stopwords. By default, stopword() will strip an array
         of "meaningless" **English** words */
  let userInputRaw = req.body.userInputRaw;
  let splitKeywordsArray = userInputRaw.split(" ");


  let keywordsArray = removePunctuation(splitKeywordsArray);


  // First we do an initial scrub using built-in stopwords
  keywordsArray = sw.removeStopwords(keywordsArray);





  // Next we do a follow-up scrub using custom stop words

  const customStopwordsArray = ['its', 'not', 'neither', 'nor', 'be', 'cannt',
    'even', 'come', 'comes', 'one', 'two', 'our',
    'ours', 'therefore', 'perhaps', 'maybe', 'none',
    'quite', 'shall', 'in', 'out', 'more', 'less',
    'toward', 'every', 'next', 'long', 'three',
    'four', 'five', 'six', 'may', 'so', 'hence',
    'consequently', 'accordingly', 'talk', 'say',
    'tell', 'again', 'ever', 'cannot', 'us',
    'having', 'once', 'held', 'give', 'giving',
    'take', 'taking', 'longer', 'find', 'back',
    'early', 'move', 'ease', 'far', 'own', 'remain',
    'uneasy', 'already', 'simply', 'hardly',
    'casually', 'abruptly'
  ];

  keywordsArray = sw.removeStopwords(keywordsArray, customStopwordsArray);




  // keywordCache = new KeywordCache(keywordsArray);
  // keywordCache.listKeywords();
  // console.log("Afer removing duplicates: " + keywordCache.getkeywordMapSize());
  // console.log("testing method " + keywordCache.getkeywordWeight('significance'));


  getRecommedations(keywordsArray);