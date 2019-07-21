import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile'
import './App.css';

class App extends Component {


  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
      </Switch>
    );
  }
}

export default App
