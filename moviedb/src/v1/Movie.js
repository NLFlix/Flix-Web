import React, { Component } from 'react';
import $ from 'jquery';

class Movie extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        
    }

    render() {
        $.ajax({
            url: "/api/" + this.props.match.params.id + "/movie",
            success: (result) => {
                console.log("Fetched data successfully")
                this.setState({movie: result})
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        });

        return (
            <div>
                {this.state.movie}
            </div>
        )
    }
}

export default Movie