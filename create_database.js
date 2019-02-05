const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('cobrachomp.db');

db.serialize(() => {
    db.run("CREATE TABLE users (id INTEGER Primary Key AUTOINCREMENT, name TEXT, score INT)");
    console.log('Success');
});

db.close();