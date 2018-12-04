const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const request = require('request')
const querystring = require('querystring');
const app = express();

app.use(express.static(path.join(__dirname, 'moviedb/build')));

// Get the DB 
let db = new sqlite3.Database('./db/NLIM.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to Movie Database')
});

// Retrieve a movie backdrop for the home page
app.get('/api/getMovieBackdrop', (req, res) => {
    db.get(`SELECT backdrop_path FROM movies WHERE adult = 0 AND backdrop_path != \'None\' AND popularity > 9.5 ORDER BY RANDOM() LIMIT 1`, (err, rows) => {
        if(err) {
            console.error(err.message);
        }

        res.json(JSON.stringify(rows));
    });
});

// Run a search given a query by the user
app.get('/api/search', (req, res) => {
    // Grab the search query
    var search = req.query;
    var query = '';
    var options = {
        url: 'http://127.0.0.1:8080/api/get_movie',
        method: 'GET',
        json: {"query": search},
        headers: {
            accept: 'application/json'
        }
    }

    // Set up the request to the DB
    request(options, function (error, response, body) {
        if(!body.hasOwnProperty('error')) {
            var list = [];

            db.all(body, (err, rows) => {
                if(err) {
                    console.error(err.message);
                }

                console.log("Retrieved search.");

                res.json(JSON.stringify(rows));
            });
        }
    });
});


// Grab specific movie by it's ID
app.get('/api/:movieID/movie', (req, res) => {
    // List of parameters
    var params = req.params

    db.get(`SELECT * FROM Movies m WHERE m.id = ?`, [params.movieID], (err, rows) => {
        if(err) {
            console.error(err.message);
        }

        res.json(JSON.stringify(rows));
    });
});


// Grab a movies video
app.get('/api/:movieID/video', (req, res) => {
    // List of parameters
    var params = req.params

    db.get(`SELECT * FROM Videos v WHERE v.movie_id = ?`, [params.movieID], (err, rows) => {
        if(err) {
            console.error(err.message);
        }

        res.json(JSON.stringify(rows));
    });
});

// Grab movie actors
app.get('/api/:movieID/actors', (req, res) =>{
    var params = req.params;
    db.all(`SELECT p.name, p.profile_path, c.character FROM People p, Cast_in_movie c WHERE p.id = c.person_id AND c.movie_id = ? ORDER BY p.popularity DESC`, [params.movieID], (err, rows) => {
        if(err) {
            console.error(err.message);
        }

        res.json(JSON.stringify(rows));
    });
});

// Grab all movie info
// app.get('/api/:movieID/movie', (req, res) => {
//     // List of parameters
//     var params = req.params

//     db.get(`SELECT * FROM People p WHERE p.id IN (SELECT person_id FROM Cast_in_movie c WHERE c.movie_id IN(SELECT id FROM Movies m WHERE m.id = ?)) UNION 
//     SELECT * FROM Movies m WHERE m.id = ?`, [params.movieID], (err, rows) => {
//         if(err) {
//             console.error(err.message);
//         }

//         res.json(JSON.stringify(rows));
//     });
// });

// // Show the actors related to the movie grabbed
// app.get('/api/getActorsPerMovie', (req, res) => {
//     db.get(`SELECT`)
// });


const port = process.env.PORT || 5000;
app.listen(port);

console.log("###############################");
console.log(" App is listening on port " + port);
console.log("###############################");
console.log()