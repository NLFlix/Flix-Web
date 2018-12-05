import Helmet from '../../node_modules/react-helmet';
import React, { Component } from 'react';
import ActorRow from './ActorRow.js';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';

class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        this.counter = 0;
        console.log(this.props.match.params.id)

        $.ajax({
            url: "/api/" + this.props.match.params.id + "/movie",
            success: (result) => {
                this.setState({ movie: result })
                console.log("Fetched data successfully")
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        });
        
        // $.ajax({
        //     url: urlString,
        //     data: {
        //         search: searchTerm
        //     },
        //     success: (results) => {
        //         console.log("Fetched data successfully")
        //         var movies = JSON.parse(results);
        //         console.log("LENGTH : " + Object.keys(movies).length)
        //         var movieRows = []
        //         this.setState({list : movies});
        //         for (var result of movies)  {
        //             if(this.counter < 24) {
        //                 var movie = result;
        //                 movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
        //                 // console.log(movie.poster_path)
        //                 const movieRow = <MovieRow key={movie.id} movie={movie} />
        //                 movieRows.push(movieRow)
        //                 this.counter++;
        //             } else {
        //                 break;
        //             }
        //         }

        //         this.setState({ rows: movieRows })
        //     },
        //     error: (xhr, status, err) => {
        //         console.error("Failed to fetch data")
        //     }
        // })
        
        $.ajax({
            url: "/api/" + this.props.match.params.id + "/actors",
            success: (result) => {
                console.log("Fetched actors successfully")
                var actorRows = []
                var actors = JSON.parse(result)
                console.log("LENGTH : " + Object.keys(actors).length)
                this.setState({ list: actors })
                for (var res of actors) {
                    if(this.counter < 6) {
                        var actor = res;
                        actor.profile_path = "https://image.tmdb.org/t/p/w185/" + actor.profile_path
                        console.log(actor.profile_path)
                        const actorRow = <ActorRow key={actor.id} actor={actor} />
                        actorRows.push(actorRow)
                        console.log("Actor added")
                        this.counter++;
                    } else {
                        break;
                    }
                }

                this.setState({ actorList: actorRows })
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        });

        $.ajax({
            url: "/api/" + this.props.match.params.id + "/video",
            success: (result) => {
                this.setState({ video: result })
                console.log("Fetched video successfully")
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        });
    }

    

    render() {
        if (this.state.video != undefined) {
            var video = JSON.parse(this.state.video)
        }
        if (this.state.movie != undefined) {
            var movie = JSON.parse(this.state.movie)
            if(this.state.video != undefined) {
                var video = JSON.parse(this.state.video)
            }

            if(this.state.actors != undefined) {
                var actors = JSON.parse(this.state.actors)
            }

            return (
                <React.Fragment>
                    <Helmet>
                        <title>NLIMBd | {movie.title} </title>
                    </Helmet>
                    <div className="masthead text-left" style={{background:"linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(https://image.tmdb.org/t/p/original/"+ movie.backdrop_path + ")"}}>
                            <p className="movie-info-style select-movie-info-sml">{movie.release_date} &nbsp;&nbsp;&nbsp;&nbsp; {movie.vote_average} <i className="fas fa-star "></i></p>
                            <p className="movie-info-style select-movie-title">{movie.title}</p>
                            <p className="movie-info-style select-movie-info">{movie.runtime}min</p>
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal">Watch Trailer</button>
                    </div>

                    <div className="sub-section">
                        <div className="wrapper">
                            <div className="row">
                                <div className="col-md-3">
                                    <img className="movie-poster" src={"https://image.tmdb.org/t/p/w500/"+ movie.poster_path} draggable="false"></img>
                                </div>

                                <div className="col-md-9">
                                    <p className="movie-info-style select-movie-info-thin" style={{paddingRight: "10%"}}>{movie.overview}</p>
                                </div>

                                {this.state.actorList}
                                
                                {/* <div className="col-md-3">
                                    {this.state.actorList}
                                    {/* https://api.themoviedb.org/3/movie/45/videos?api_key=43d55e451cc1d6c86fb932bf30f3ad09&language=en-US */}
                                    {/* <video width="320" height="240" controls>
                                        <source src={"https://api.themoviedb.org/3/movie/" + video.movie_id + "/videos?api_key=43d55e451cc1d6c86fb932bf30f3ad09&language=en-US"} type="video/mp4" />
                                    </video> */}
                                {/* </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">


                            <div className="modal-header">
                                <h4 className="modal-title">Modal Heading</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>


                            <div className="modal-body">
                                Modal body..
                            </div>


                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return <p></p>
        }
    }
}

export default Movie