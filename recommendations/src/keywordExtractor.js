const sw = require('stopword');
const CustomStopwords = require('../local_data/KeywordExtractorStopwords'); 




class KeywordExtractor {

    constructor () {

        this.buffer = []; 
        this.customStopwords = CustomStopwords; 

    }

    removePunctuation(wordsArray) {
        let cleanWords = wordsArray.map(
          word => word.replace(/[^a-z0-9+]+/gi, '')
        );
      
        cleanWords = cleanWords.filter( word => word.length > 1 ); 
        return cleanWords;
      }

      getKeywords(rawInputArray) {

        let splitInputArray = rawInputArray.split(" ");

        let keywordsArray = this.removePunctuation(splitInputArray);

        // First we do an initial scrub using built-in stopwords
        keywordsArray = sw.removeStopwords(keywordsArray);

        // Next we do a follow-up scrub using custom stop words
        keywordsArray = sw.removeStopwords(keywordsArray, customStopwordsArray);

        return keywordsArray; 

    }



}

module.exports = KeyWordExtractor = new KeywordExtractor(); 
