import React, { Component } from 'react';
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
                <div>
                    <p> {movie.id} </p>
                </div>
            );
        } else {
            return <p></p>
        }
    }
}

export default Movie