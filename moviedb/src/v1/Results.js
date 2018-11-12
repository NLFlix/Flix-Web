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
            <React.Fragment>
                <nav class="navbar navbar-default">
                    <div class="container-fluid">

                        <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Brand</a>
                        </div>

                        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
                            <li><a href="#">Link</a></li>
                            <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">One more separated link</a></li>
                            </ul>
                            </li>
                        </ul>
                        <form class="navbar-form navbar-left">
                            <div class="form-group">
                            <input type="text" class="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                        <ul class="nav navbar-nav navbar-right">
                            <li><a href="#">Link</a></li>
                            <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>

                <input style={{
                    fontSize: 24,
                    display: 'block',
                    width: "99%",
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16
                }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" />

                <div className="wrapper">
                    <div className="row">
                        {this.state.rows}
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
export default Results    
