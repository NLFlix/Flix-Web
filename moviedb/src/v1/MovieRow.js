import React from 'react'
import $ from 'jquery'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class MovieRow extends React.Component {
  viewMovie() {
    // console.log("Trying to view movie")
    // console.log(this.props.movie.title)
    //const url = "https://www.themoviedb.org/movie/" + this.props.movie.id
    const url = "/api/" + this.props.movie.id + "/movie"
    $.ajax({
      url: url,
      success: (results) => {
        console.log("Fetched data successfully")
        // console.log(searchResults)
        // console.log(results[0])
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  render() {
    return <table key={this.props.movie.id}>
    <tbody>
      <tr>
        <td>
          <img alt="poster" width="120" src={this.props.movie.poster_src}/>
        </td>
        <td>
          <h3>{this.props.movie.title}</h3>
          <p>{this.props.movie.overview}</p>
          <input type="button" onClick={this.viewMovie.bind(this)} value="View"/>
        </td>
      </tr>
    </tbody>
  </table>
  }
}

export default MovieRow