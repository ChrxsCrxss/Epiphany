const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const KeyWordExtractor = require('./src/keywordExtractor'); 

const app = express(); 

app.use(bodyParser.json());
app.use(cors()); 




app.post('/recommendations', (req, res) => {

    // First, grab the user input from the http request body
    const TextInput =  req.body.textInput; 
    console.log(TextInput);

    // Next, clean the user input to remove stopwords and 
    // punctuation 

    const keywords = KeyWordExtractor.getKeywords(TextInput);

    console.log(keywords);

    res.send({}); 

}); 

app.listen(4000, () => {
    console.log('listening on port 4000');
})