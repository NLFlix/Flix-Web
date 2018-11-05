import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path = '/' component={Home}/>
          <Route path = '/:id/movie' component={Movie}/>
        </Switch>
      </div>
    );
  }
}

export default App;
