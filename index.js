const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const request = require('request')
const querystring = require('querystring');
const app = express();

app.use(express.static(path.join(__dirname, 'moviedb/build')));

let db = new sqlite3.Database('./db/NLIM.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to Movie Database')
});


app.get('/api/getMovieBackdrop', (req, res) => {
    db.get(`SELECT backdrop_path From movies WHERE adult = 0 AND backdrop_path != \'None\' ORDER BY RANDOM() LIMIT 1`, (err, rows) => {
        if (err) {
            console.error(err.message);
        }

        res.json(JSON.stringify(rows));
    });
});

app.get('/api/search', (req, res) => {
    var search = req.query;
    var query = '';
    var options = {
        url: 'http://127.0.0.1:8080/api/get_movie',
        method: 'GET',
        json: { "query": search },
        headers: {
            accept: 'application/json'
        }
    }

    request(options, function (error, response, body) {
        console.log(body);
        var list = []
        db.all(body, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Retrieved All');
            // rows.forEach((row) => {
            //     console.log('Row');
            //     movieInfo = JSON.stringify(row);
            //     list.push(movieInfo);
            // });
            res.json(JSON.stringify(rows));
        });
    });

});

app.get('/api/:movieID/movie', (req, res) => {
    var params = req.params;
    db.get(`SELECT * from Movies m where m.id = ?`, [params.movieID], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        console.log(rows);
        res.json(JSON.stringify(rows));
    });
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);