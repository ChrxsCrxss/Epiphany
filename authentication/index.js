const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express(); 

app.use(bodyParser.json());
app.use(cors()); 

app.get('/', (req, res) => {

    console.log(req.body);

    res.send({respone : 'hello from authentication server'}); 

}); 


app.post('/', (req, res) => {

    console.log(req.body);

    res.send({respone : 'hello from authentication server'}); 

}); 

app.listen(5000, () => {
    console.log('listening on port 5000');
})