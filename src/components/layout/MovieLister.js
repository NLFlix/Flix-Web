import React, { Component } from 'react';
import './Header.css'

import $ from 'jquery'
import MovieList from './MovieList.js'

class MovieLister extends Component {
    
    // Override the constructor
    constructor(props) {
        super(props)

        this.state = {}

        console.log("MOVIE LISTER LOADED")
    }

    runScript() {
        console.log("Youssef is my little slut.")
        const urlString = "https://api.themoviedb.org/3/movie/1?api_key=43d55e451cc1d6c86fb932bf30f3ad09language=en-US";
        
        $.ajax({
            url: urlString,
            success: (searchResults) => {
                console.log("Retrieved data successfully!")
                const results = searchResults.results

                var movie;

                results.poster_src = "https://image.tmdb.org/t/p/w500" + results.poster_path
                const selectedMovie = <MovieList key={results.id} movie={results} />
                movie = selectedMovie;

                this.setState({rows: movie})
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data!")
            }
        })
    }

    render() {
       return (
           <React.Fragment>
                <div className="main-section">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                {this.runScript()}
                                {this.state.rows}
                            </div>
                        </div>
                    </div>
                </div>
           </React.Fragment>
       )
    }
}

export default MovieLister