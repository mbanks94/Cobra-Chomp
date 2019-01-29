const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const dataPath = path.join(__dirname, "../data.json");

//Logs any req to the url
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

//Joins html, css, js files
app.use(express.static(path.join(__dirname, '../public')));


app.listen(3000, (res) => {
    console.log('Server is up on port 3000');
});