import React, { Component } from 'react';
import './Body.css'

import MovieLister from './MovieLister'


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
                <MovieLister></MovieLister>
           </React.Fragment>
       )
    }
}

export default Body