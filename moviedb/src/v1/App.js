import React, { Component } from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Movie from './Movie';
import Results from './Results';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path ='/' component={Home}/>
          <Route path = '/results' component={Results}/>
          <Route path = '/movie/:id' component={Movie}/>
        </Switch>
      </div>
    );
  }
}

export default App;
