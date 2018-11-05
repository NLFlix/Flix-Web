import React from 'react'
import $ from 'jquery'
import { Link } from "react-router-dom";

class MovieRow extends React.Component {
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
          <Link to={'./' + this.props.movie.id + '/movie'}>
            <button variant='raised'>
              View
            </button>
          </Link>
        </td>
      </tr>
    </tbody>
  </table>
  }
}

export default MovieRow