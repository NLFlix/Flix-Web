import React, { Component } from 'react';
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
            <React.Fragment>
                <div className="main-section">
                    <div className="wrapper">
                        <div className="row">
                            <div class="col-md-3"></div>
                            <div className="col-md-6">
                                <div className="input-group">
                                    <input id="search-text" type="text" className="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                    <div className="input-group-append">
                                        <button onClick = {this.searchHandler.bind(this)} className="btn btn-success" type="button">Button</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <input id="search-text" style={{
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
                </div> */}
                </React.Fragment>
        );
    }
}
export default withRouter(Home)    
