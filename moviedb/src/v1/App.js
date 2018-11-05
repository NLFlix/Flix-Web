import React, { Component } from 'react';
import '../App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
    // console.log("This is my initializer")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    //    title: "Avengers: Infinity War", overview: "As the Avengers and their allies have continued to protect the world from threats too large"},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    //    title: "	The Avengers", overview: "This is my second overview"},
    // ]

    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRow movie={movie} />
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}
    
    //this.performSearch("ant man")
  }

  // componentDidMount(){
  //   this.getMovies();
  // }

  getMovies = () => {
    fetch('/api/getAllMovies')
    .then(res => res.json())
    .then(list => this.setState({ list }))
    // .then(function(res){
    //   return res.json();
    // })
    // .then(function(list) {
    //   var movieRows = []
    //   Object.keys(list).forEach(function(key) {
    //     const movieRow = <MovieRow key={key} movie={list[key]['title']}/>
    //     movieRows.push(movieRow)
    //   });
    //   return movieRows;
    // });
  }

  // componentDidMount(){
  //   this.getMovies();
  // }

  // performSearch(searchTerm) {
  //   console.log("Perform search using moviedb")
  //   const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm


  //   $.ajax({
  //     url: urlString,
  //     success: (searchResults) => {
  //       console.log("Fetched data successfully")
  //       // console.log(searchResults)
  //       const results = searchResults.results
  //       // console.log(results[0])

  //       var movieRows = []

  //       results.forEach((movie) => {
  //         movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
  //         // console.log(movie.poster_path)
  //         const movieRow = <MovieRow key={movie.id} movie={movie}/>
  //         movieRows.push(movieRow)
  //       })

  //       this.setState({rows: movieRows})
  //     },
  //     error: (xhr, status, err) => {
  //       console.error("Failed to fetch data")
  //     }
  //   })
    
    
  // }

  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    //const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    const urlString = "/api/search"

    $.ajax({
      url: urlString,
      data: {
        search: searchTerm
      },
      success: (results) => {
        console.log("Fetched data successfully")
        // console.log(searchResults)
        // console.log(results[0])

        var movieRows = []

        results.forEach((result) => {
          var movie = JSON.parse(result)
          movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path)
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
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
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)
  }

  render() {
    // return (
    //   <div className="home-page-container">
    //     {
    //       this.state.list.map(location =>
    //         <li key={location.id}>
    //           {location.title}
    //           <br/>
    //           {location.poster_path}
    //         </li>)
    //     }
    //   </div>
    // );
    return (
      <div>
        
        <table className="titleBar">
          <tbody>
            <tr>
              <td>
                <img alt="app icon" width="50" src="green_app_icon.svg"/>
              </td>
              <td width="8"/>
              <td>
                <h1>MoviesDB Search</h1>
              </td>
            </tr>
          </tbody>
        </table>

        <input style={{
          fontSize: 24,
          display: 'block',
          width: "99%",
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 16
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
