import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from 'react-router'; 
import $ from 'jquery';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            backdrop: ''
        }
        
        this.getBackDrop();
        
    }
        
    getBackDrop(){
        $.ajax({
            url: "/api/getMovieBackdrop",
            success: (result) => {
                var backdrop = JSON.parse(result);
                console.log(backdrop);
                if(backdrop.backdrop_path == null){
                    console.log('No backdrop, retrying');
                    this.getBackDrop();
                } else {
                    console.log(backdrop);
                    this.setState({backdrop: backdrop});
                }
            },
            error: (xhr, status, err) => {
                console.error("Failed to fetch data")
            }
        });
    }

    performSearch(searchTerm) {
        if(searchTerm != ""){
            console.log(searchTerm)
            this.props.history.push({
                pathname: '/results',
                state:{
                    data: searchTerm
                }
            })
        }
    }

    searchHandler(){
        const boundObject = this
        const searchTerm = document.getElementById('search-text').value
        boundObject.performSearch(searchTerm)
    }
    render() {
        console.log('Render');
        if(this.state.backdrop != undefined) {
            return (
                <React.Fragment>
                    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
                        <a class="navbar-brand" href="/">NLIMDb</a>
                    </nav>

                    <div className="main-section" style={{background:"linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(https://image.tmdb.org/t/p/original/"+ this.state.backdrop.backdrop_path + ")"}}>
                        <div className="wrapper">
                            <div className="row">
                                <div class="col-md-3"></div>
                                <div className="col-md-6">
                                    <div className="input-group">
                                        <input id="search-text" type="text" className="form-control" placeholder="What are you in the mood to watch?" aria-label="What are you in the mood to watch?" aria-describedby="wayitmtw?" />
                                        <div className="input-group-append">
                                            <button onClick = {this.searchHandler.bind(this)} className="btn btn-success" type="button"><i class="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3"></div>

                                <div class="col-md-3"></div>
                                <div class="col-md-6">
                                    <p>{this.state.backdrop.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else { return <p></p> }
    }
}
export default withRouter(Home)    
