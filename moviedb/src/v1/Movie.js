import Helmet from '../../node_modules/react-helmet';
import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery';


class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        $.ajax({
            url: "/api/" + this.props.match.params.id + "/movie",
            success: (result) => {
                console.log("Fetched data successfully")
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        }).done((result) => {
            this.setState({ movie: result })
            console.log("component mount")
        });
    }

    componentDidMount() {
       
    }

    render() {
        console.log("render")
        if (this.state.movie != undefined) {
            var movie = JSON.parse(this.state.movie)
            return (
                <React.Fragment>
                    <Helmet>
                        <title>NLIMBd | {movie.title}</title>
                    </Helmet>
                    
                    <div className="masthead text-left" style={{background:"linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(https://image.tmdb.org/t/p/original/"+ movie.backdrop_path + ")"}}>
                            <p className="movie-info-style select-movie-info-sml">{movie.release_date} &nbsp;&nbsp;&nbsp;&nbsp; {movie.vote_average} <i className="fas fa-star "></i></p>
                            <p className="movie-info-style select-movie-title">{movie.title}</p>
                            <p className="movie-info-style select-movie-info">{movie.runtime}min</p>
                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#myModal"><font class="movie-info-style">TRAILER</font> &nbsp;&nbsp;&nbsp;<i class="fas fa-play"></i></button>
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

                                <div className="col-md-3 text-center">
                                    <div className="card" style={{width: "18rem;"}}>
                                        <img className="card-img-top" src="https://image.tmdb.org/t/p/w138_and_h175_face/vYxl6lGbVPr7f8QlaSdeRLUs5PB.jpg" alt="Card image cap"/>
                                        <div className="card-body">
                                            <h5 className="card-title">Ryan Reynolds</h5>
                                            <p className="card-text">Deadpool</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <img src="https://image.tmdb.org/t/p/w138_and_h175_face/vYxl6lGbVPr7f8QlaSdeRLUs5PB.jpg"></img>
                                </div>

                                <div className="col-md-3">
                                    <img src="https://image.tmdb.org/t/p/w138_and_h175_face/vYxl6lGbVPr7f8QlaSdeRLUs5PB.jpg"></img>
                                </div>

                                <div className="col-md-3">
                                    <img src="https://image.tmdb.org/t/p/w138_and_h175_face/vYxl6lGbVPr7f8QlaSdeRLUs5PB.jpg"></img>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <iframe width="854" height="480" className="embed-responsive-item" src="https://www.youtube.com/embed/nwyjxsOYnys" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                                    </div>
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