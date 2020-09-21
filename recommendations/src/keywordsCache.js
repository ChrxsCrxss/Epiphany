

/**
 * Object responsible for hashing and storing keywords
 * as key-value pairs. 
 */
export default class KeywordCache {

    /**
     * @param {object} wordsArray 
     * The constructor must 
     */
    constructor(wordsArray = []) {
      this.keywordMap = new Map();
      this.insertKeywords(wordsArray);
    };
  
    getkeywordWeight(keyword) {
  
      if (typeof(keyword) !== 'string') throw 'keyword not a string';
      if (keyword === '') throw 'keyword is empty';
  
      if (this.keywordMap.has(keyword)) {
        return this.keywordMap.get(keyword);
      } else {
        throw 'keyword is not in cache';
      }
    };

    getKeywordsMap() {
        return {
            ...this.keywordMap
        };
    };
  
    getkeywordMapSize() {
      return this.keywordMap.size;
    };
  
    isValidWord(word) {
      return typeof(word) === 'string' && word.length > 1;
    };

    /**
     * 
     * @param {*} param0 Input is automatically spread into 
     * an array and checked for validty
     */
    insertKeywords([...words]) {
  
      for (let i = 0; i < words.length; ++i) {
  
        if (! this.isValidWord(words[i]) ) { continue; }
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