import React, { Component } from 'react';
import * as $ from 'jquery';

/* Layout imports */
import Header from './layout/Header.js'
import Footer from './layout/Footer.js'
import Body from './layout/Body.js'

class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Header></Header>
                <Body></Body>
                <Footer></Footer>
            </React.Fragment>
        )
    }
}

export default Home