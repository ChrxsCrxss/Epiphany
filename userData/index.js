const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/userData', (req, res) => {

    console.log('hi');

    console.log(req.body);

    res.send('ok');
});


app.listen(5000, () => {
    console.log('listening on port 5000');

});