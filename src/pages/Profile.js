import React, { Component } from 'react'
import Header from '../components/Header/Header'
import { Redirect } from 'react-router-dom'

import './Profile.css'

class Profile extends Component {

  componentDidMount = () => {
    let auth_token = localStorage.getItem('auth_token')
    this.setState({
      auth_token: auth_token
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      auth_token: nextProps.auth_token
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      auth_token: ''
    }
  }
  render() {
    console.log('uuuuuu', this.state)
    if (!localStorage.getItem('auth_token')) {
      return <Redirect to='/' />
    }
    return (
      <main>
        <Header />
        Profile page
      </main>
    )
  }
}

export default Profile