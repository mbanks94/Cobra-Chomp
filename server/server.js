const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('cobrachomp.db');



//Joins html, css, js files
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({extended:false}));
//Logs any req to the url
app.use((req, res, next) => {
    console.log(req.url);
    next();
});

app.get('/users', (req, res) => {
    db.all('SELECT name FROM users', (err, row) => {
        const allUserNames = row.map(e => e.name);
        res.send(allUserNames);
    });
});

app.post('/scores', (req, res) => {
    // let name = req.body.name;
    // let score = req.body.score;
    // let item = {"name":name, "score":score};
    // fs.appendFileSync(dataPath, 
    //     JSON.stringify(item, null, 4), 'utf-8', err => console.log(err));
    
    db.run(
        "INSERT INTO users VALUES ($name, $score)", 
        {
            $name: req.body.name,
            $score: req.body.score
        },
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