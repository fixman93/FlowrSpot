import React, { Component } from 'react'

import Search from '../components/Home/Search'
import Flower from '../components/Home/Flower'
import './Home.css'

class Home extends Component {
  render() {
    return (
      <main>
        <Search />
        <Flower />
      </main>
    )
  }
}

export default Home