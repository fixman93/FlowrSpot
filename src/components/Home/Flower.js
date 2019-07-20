import React, { Component } from 'react'
import {
  Col, Row
} from 'reactstrap'
import Container from '../../common/container/Container'
class Flower extends Component {
  render() {
    console.log('items', this.props.flowers.result)
    return (
      <Container>
        <Row>
          {this.props.flowers && this.props.flowers.result && this.props.flowers.result.flowers ? this.props.flowers.result.flowers.map(item => {
            return (
              <Col lg={3} md={4} sm={6} key={item.id} className="flower-item">
                <div className="flower-item-info">
                  <img src={item.profile_picture} alt={item.latin_name} />
                  <div className="flower-info">
                    <h2>{item.name}</h2>
                    <h3>{item.latin_name}</h3>
                    <span>{item.sightings} sightings</span>
                  </div>
                </div>
              </Col>
            )
          }) : null}
        </Row>
      </Container>
    )
  }
}

export default Flower