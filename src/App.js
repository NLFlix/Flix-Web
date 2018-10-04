import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'

// My object
import MovieRow from './movieRow.js'
import MovieLoader from './movieLoader.js'

class App extends Component {
  
  // Override constructor
  constructor(props) {
    super(props)

    this.state= {}

    console.log("This is my init.")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "Avengers: Infinity War", overview: "Some description for the movies 1."},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", title: "The Avengers", overview: "Some description for the movies number 2."}
    // ]

    // this.state = {rows: <p>This is a row</p>}

    // var movieRows = []
    
    // movies.forEach((movie) => {
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}

    // this.performSearch("ant man")
  }

  // Function to perform search
  performSearch(searchTerm) {
    console.log("Persom search with movieDB.")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=43d55e451cc1d6c86fb932bf30f3ad09&language=en-US&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully!")
        //console.log(searchResults)
        const results = searchResults.results
        //console.log(results[0])

        var movieRows = []

        results.forEach((movie) => {
          movie.poster_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path
          // console.log(movie.title)
          const movieRow = <MovieLoader key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  searchChangeHandler(event) {
    const searchTerm = event.target.value
    const boundObject = this
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">Navbar</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
           </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto"></ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav>

        {/* <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="App Icon" width="50" src="logo.png" />
              </td>
              <td width="8"></td>
              <td>
                <h2>MoviesDB Search</h2>
              </td>
            </tr>
          </tbody>
        </table> */}

        <input style={{
          fontSize: 24,
          display: "block",
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Search Movie.." />
        <div class="container"><div class="wrapper"><div class="row">{this.state.rows}</div></div></div>
      </React.Fragment>
    );
  }
}

export default App;
