import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginUser } from './store/actions/loginAction'
import Header from './components/Header/Header'
import Search from './components/Home/Search'
import Flower from './components/Home/Flower'

import './App.css';

class App extends Component {


  render() {
    return (
      <main>
        <Header />
        <Search />
        <Flower />
      </main>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  loginUser: (data) => dispatch(loginUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
