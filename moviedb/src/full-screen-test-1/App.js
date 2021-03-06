import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css';

// My object
import MovieLoader from '../movieLoader.js'

class App extends Component {
  
  // Override constructor
  constructor(props) {
    super(props)

    this.state= {}

    console.log("This is my init.")

    const urlString = "https://api.themoviedb.org/3/trending/all/week?api_key=43d55e451cc1d6c86fb932bf30f3ad09"
  
    // AJAX call
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully!")
        //console.log(searchResults)
        const results = searchResults.results
        //console.log(results[0])

        // List of movies
        var movieRows = []

        // Grab the first 4 of a result .. ?
        for (var i = 0; i < 6; i++) { 

          results[i].poster_src = "https://image.tmdb.org/t/p/w500" + results[i].poster_path 
          const movieRow = <MovieLoader key={results[i].id} movie={results[i]} />

          movieRows.push(movieRow)
        }

        // Given the list of results of 'movie'
        // results.forEach((movie) => {

        //   // Create movie object and give it it's poster image
        //   movie.poster_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path
        //   // console.log(movie.title)

        //   // Set movie object
        //   const movieRow = <MovieLoader key={movie.id} movie={movie}/>

        //   // Push to list of movies
        //   movieRows.push(movieRow)
        // })

        // Set the state to the list, update view
        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
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

    // Given the search term, call the API to return a list of movies with the given term
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=43d55e451cc1d6c86fb932bf30f3ad09&language=en-US&query=" + searchTerm
    
    // AJAX call
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully!")
        //console.log(searchResults)
        const results = searchResults.results
        //console.log(results[0])

        // List of movies
        var movieRows = []

        console.log(results)

        // Given the list of results of 'movie'
        results.forEach((movie) => {

          // Create movie object and give it it's poster image
          movie.poster_src = "https://image.tmdb.org/t/p/w500" + movie.poster_path
          // console.log(movie.title)

          // Set movie object
          const movieRow = <MovieLoader key={movie.id} movie={movie}/>

          // Push to list of movies
          movieRows.push(movieRow)
        })

        // Set the state to the list, update view
        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }
    })
  }

  // When search bar input changes per char, run this
  searchChangeHandler(event) {

    // Grab the current text inside search bar
    const searchTerm = event.target.value
    const boundObject = this

    // Perform a search on the input
    boundObject.performSearch(searchTerm)
  }

  render() {
    return (
      <React.Fragment>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
           </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto"></ul>
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </nav> */}

        {/* <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
            <a className="navbar-brand">SCREENIT</a>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#" style={{color: 'white'}}>About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger"  href="#" style={{color: 'white'}}>Projects</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link js-scroll-trigger" href="#" style={{color: 'white'}}>Contact</a>
                </li>
              </ul>
        </nav> */}

        {/* <div className="masthead">
            <div className="wrapper">
                <div className="container d-flex h-100 align-items-center">
                    <div className="input-group">
                    <input type="text" className="form-control" placeholder="What are you in the mood to watch?" />
                    <div className="input-group-append">
                        <button className="btn btn-success" type="submit">Go</button> 
                    </div>
                    </div>
                </div>
            </div>
        </div> */}

    <header>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
      
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner" role="listbox">

          <div className="carousel-item active" style={{backgroundImage: "url(https://image.tmdb.org/t/p/original/oMKFQmoVgB69fyXfSMu0lGlHJP2.jpg)"}}>
            <div className="carousel-caption d-none d-md-block">
              <h3>First Slide</h3>
              <p>This is a description for the first slide.</p>
            </div>
          </div>

          <div className="carousel-item" style={{backgroundImage: "url(https://image.tmdb.org/t/p/original/7diKA3XyLUB9pV6oI9FznQ5lv66.jpg)"}}>
            <div className="carousel-caption d-none d-md-block">
              <h3>Second Slide</h3>
              <p>This is a description for the second slide.</p>
            </div>
          </div>

          <div className="carousel-item" style={{backgroundImage: "url(https://image.tmdb.org/t/p/original/3P52oz9HPQWxcwHOwxtyrVV1LKi.jpg)"}}>
            <div className="carousel-caption d-none d-md-block">
              <h3>Third Slide</h3>
              <p>This is a description for the third slide.</p>
            </div>
          </div>
        </div>
      </div>
    </header>

        {/* <input style={{
          fontSize: 24,
          display: "block",
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Search Movie.." />*/}
        {/* <div className="sub-section">
          <div className="wrapper">
            <div className="row">
              <div className="col-md-12 text-left">
                <h4 style={{color:"white", paddingBottom: 10}}>FILM REEL</h4>
              </div>
              this.testFunction()
              this.state.rows
            </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default App;
