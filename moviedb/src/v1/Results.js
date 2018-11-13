import React, { Component } from 'react';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
import '../App.css';

class Results extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        }

        this.performSearch(this.props.location.state.data)
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
            <React.Fragment>
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="#">NLIMDb</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        </ul>
                        <form class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
                {/* <input style={{
                    fontSize: 24,
                    display: 'block',
                    width: "99%",
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16
                }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" /> */}
                <div className="main-section" style={{backgroundColor: "#19181D"}}>
                    <div className="wrapper-t">
                        <div className="row">
                            {this.state.rows}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Results    
