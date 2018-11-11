import React, { Component } from 'react';
import MovieRow from './MovieRow.js';
import $ from 'jquery';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from 'react-router' 

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    performSearch(searchTerm) {
        console.log(searchTerm)
        this.props.history.push({
            pathname: '/results',
            state:{
                data: searchTerm
            }
        })
    }

    searchHandler(){
        const boundObject = this
        const searchTerm = document.getElementById('search-text').value
        boundObject.performSearch(searchTerm)
    }
    render() {
        return (
            <div>
                <table className="titleBar">
                    <tbody>
                        <tr>
                            <td>
                                <img alt="app icon" width="50" src="green_app_icon.svg" />
                            </td>
                            <td width="8" />
                            <td>
                                <h1>MoviesDB Search</h1>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <input id="search-text" style={{
                    fontSize: 24,
                    display: 'block',
                    width: "99%",
                    paddingTop: 8,
                    paddingBottom: 8,
                    paddingLeft: 16
                }}  placeholder="Enter search term" />

                <button onClick = {this.searchHandler.bind(this)}>
                    Search
                </button>

                <div className="wrapper">
                    <div className="row">
                        {this.state.rows}
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(Home)    
