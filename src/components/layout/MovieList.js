import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

class MovieList extends React.Component {
    render() {
      return <div key={this.props.movie.id} className="col-md-3">
        <img alt="Poster" width="200" height="auto" src = {this.props.movie.poster_src}/>
      </div>
    }
}

export default MovieList