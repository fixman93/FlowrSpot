import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header/Header'
import Search from '../components/Home/Search'
import Flower from '../components/Home/Flower'
import { getFlower } from '../store/actions/flowerAction'


import './Profile.css'

class Home extends Component {

  componentDidMount = async () => {

    this.setState({
      flowers: this.props.flowers
    })
  }

  componentWillMount() {
    this.props.getFlower()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      flowers: nextProps.flowers
    });
  }

  constructor(props) {
    super(props)
    this.state = {
      flowers: []
    }
  }
  render() {
    console.log('flowers', this.props.flowers)
    return (
      <main>
        <Header />
        <Search />
        <Flower flowers={this.props.flowers} />
      </main>
    )
  }
}

const mapStateToProps = state => ({
  flowers: state.flowerReducer
})

const mapDispatchToProps = dispatch => ({
  getFlower: () => dispatch(getFlower())
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)