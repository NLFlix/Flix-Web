const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.static(path.join(__dirname, 'moviedb/build')));

let db = new sqlite3.Database('./db/NLIM.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to Movie Database')
});

function getMovies(){
    var list = []
    
}

app.get('/api/getAllMovies', (req,res) => {
    var list= []
    db.all(`SELECT * From Movies`, (err, rows) => {
        if (err) {
          console.error(err.message);
        }
        rows.forEach((row) => {
            movieInfo = JSON.stringify(row);
            list.push(movieInfo);
        });
        res.json(list);
    });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);