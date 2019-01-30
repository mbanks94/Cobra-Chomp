const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');


const app = express();
const dataPath = path.join(__dirname, "../scores.json");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Logs any req to the url
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.post('/scores', (req, res) => {
    let name = req.body.name;
    let score = req.body.score;
    res.send('Name: ' + name + ' Score: ' + score);
    let writeData = fs.appendFileSync(dataPath, 
        JSON.stringify('Name: ' + name + ' Score: ' + score + '; '),
        'utf-8', err => console.log(err));
});

//Joins html, css, js files
app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, (res) => {
    console.log('Server is up on port 3000');
});