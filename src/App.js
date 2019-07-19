import React, { Component } from 'react'
import { connect } from 'react-redux'
import { simpleAction } from './store/actions/simpleAction'
import { loginUser } from './store/actions/loginAction'
import Header from './components/Header/Header'
import Search from './components/Home/Search'
import Flower from './components/Home/Flower'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }
  simpleAction = (event) => {
    this.props.simpleAction();
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  loginUser = (e) => {
    e.preventDefault()
    console.log(this.state)
    this.props.loginUser()
  }
  render() {
    return (
      <main>
        <Header />
        <Search />
        <Flower />
        <div className="App">
          <button onClick={this.simpleAction}>Test redux action</button>
          <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>

          <form>
            <input onChange={(e) => this.handleChange(e)} name='email' type="email" placeholder="email" />
            <input onChange={(e) => this.handleChange(e)} name='password' type="password" placeholder="password" />
            <button onClick={this.loginUser}>Login</button>
          </form>
        </div>
      </main>

    );
  }
}

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction()),
  loginUser: (data) => dispatch(loginUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
