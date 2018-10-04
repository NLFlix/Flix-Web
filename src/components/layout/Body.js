import React, { Component } from 'react';
import './Body.css'
import MovieLoader from '../../movieLoader';

class Body extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="main-section">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <input style={{fontSize: 24}} placeholder="Search Movie.." />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-section">
                    <div className="wrapper">
                        <div className="row">
                            <div className="col-md-12">
                                <input style={{fontSize: 24}} placeholder="Search Movie.." />
                            </div>
                        </div>
                    </div>
                </div>
           </React.Fragment>
       )
    }
}

export default Body