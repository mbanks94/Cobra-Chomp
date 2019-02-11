const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3');
const dbPath = path.join(__dirname, '../db/cobrachomp.db');

app.use(express.json());
//Joins html, css, js files
app.use(express.static(path.join(__dirname, '../public')));
//Logs any req to the url
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, 
    (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Connected to DB');
        }
});

app.get('/users', (req, res) => {
    db.all('SELECT name FROM users', (err, row) => {
        const allUserNames = row.map(e => e.name);
        res.send(allUserNames);
    });
});

app.post('/scores', (req, res) => {
    db.run("INSERT INTO users VALUES ($name, $score)", {$name: req.body.name, $score: req.body.score},
        (err) => {
            if (err) {
                res.send({message: 'error in app.post(/scores)'});
            } else {
                res.send({message: 'successful'});
            }
        }
    );
});

app.listen(3000, (res) => {
    console.log('Server is up on port 3000');
});