import React, { Component } from 'react'

import SearchHeroBG from '../../assets/pl-hero@3x.png'
import SearchBtn from '../../assets/pl-icon-search.svg'
class Home extends Component {


  render() {

    const homebg = {
      backgroundImage: `url(${SearchHeroBG})`
    }
    return (
      <div className="search-hero" style={homebg}>
        <h1>Discover flowers around you</h1>
        <p>Explore between more than 8.427 sightings</p>
        <div className="searchForm">
          <input type="text" placeholder="Looking for something specific?" />
          <button><img src={SearchBtn} alt="Search Button" /></button>
        </div>
      </div>
    )
  }
}

export default Home