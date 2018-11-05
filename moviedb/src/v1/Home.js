import React, { Component } from 'react';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }
    }

    performSearch(searchTerm) {
        console.log("Perform search using moviedb")
        const urlString = "/api/search"

        $.ajax({
            url: urlString,
            data: {
                search: searchTerm
            },
            success: (results) => {
                console.log("Fetched data successfully")
                // console.log(searchResults)
                // console.log(results[0])

                var movieRows = []

                results.forEach((result) => {
                    var movie = JSON.parse(result)
                    movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
                    // console.log(movie.poster_path)
                    const movieRow = <MovieRow key={movie.id} movie={movie} />
                    movieRows.push(movieRow)
                })

                this.setState({ rows: movieRows })
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        })

    }


    searchChangeHandler(event) {
        console.log(event.target.value)
        const boundObject = this
        const searchTerm = event.target.value
        boundObject.performSearch(searchTerm)
    }
    render() {
        return (
            <div>
                <table className="titleBar">
                    <tbody>
                        <tr>
                            <td>
                                <img alt="app icon" width="50" src="green_app_icon.svg" />
                            </td>
                            <td width="8" />
                            <td>
                                <h1>MoviesDB Search</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <input style={{
                    fontSize: 24,
                    display: 'block',
                    width: "99%",
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16
                }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" />

                {this.state.rows}

            </div>
        );
    }
}
export default Home    
