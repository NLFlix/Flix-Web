import Helmet from '../../node_modules/react-helmet';
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
        this.counter = 0;
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
                var movies = JSON.parse(results);
                var movieRows = []
                this.state.list = movies;
                for (var result of movies){
                    if(this.counter < 12) {
                        var movie = result;
                        movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
                        // console.log(movie.poster_path)
                        const movieRow = <MovieRow key={movie.id} movie={movie} />
                        movieRows.push(movieRow)
                        this.counter++;
                    } else {
                        break;
                    }
                }

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
                <Helmet>
                    <title>NLIMBd | {this.props.location.state.data}</title>
                </Helmet>

                <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
                    <a class="navbar-brand" href="/">NLIMDb</a>
                </nav>
                {/* <input style={{
                    fontSize: 24,
                    display: 'block',
                    width: "99%",
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16
                }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term" /> */}
                <div className="main-section" style={{backgroundColor: "#19181D", paddingTop: "50px"}}>
                    <div className="wrapper-t">
                        <div className="row">
                            <div class="col-md-12 text-left">
                                <h1 style={{color:"white", fontSize:"20px", fontWeight:"900"}}>SEARCHING FOR : {this.props.location.state.data}</h1>
                            </div>
                            {this.state.rows}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default Results    
