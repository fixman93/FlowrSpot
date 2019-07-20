import React, { Component } from 'react'

class Flower extends Component {
  render() {
    console.log('items', this.props.flowers.result)
    return (
      <div>
        <ul>
          {this.props.flowers && this.props.flowers.result && this.props.flowers.result.flowers ? this.props.flowers.result.flowers.map(item => {
            return (
              <li key={item.id}>{item.name}</li>
            )
          }) : null}
        </ul>
      </div>
    )
  }
}

export default Flower