import React, { Component } from 'react'
import Header from '../components/Header/Header'
import Search from '../components/Home/Search'
import Flower from '../components/Home/Flower'

import './Profile.css'

class Home extends Component {
  render() {
    return (
      <main>
        <Header />
        <Search />
        <Flower />
      </main>
    )
  }
}

export default Home