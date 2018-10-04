import React, { Component } from 'react';

class Footer extends Component {
    render() {
       return (
           <React.Fragment>
                <footer className="page-footer font-small blue fixed-bottom">
                    <div className="footer-copyright text-center py-3">© 2018 Copyright:
                    <a href="https://mdbootstrap.com/bootstrap-tutorial/"> MDBootstrap.com</a>
                    </div>
                </footer>
           </React.Fragment>
       )
    }
}

export default Footer