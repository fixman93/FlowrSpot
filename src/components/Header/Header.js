import React, { Component } from 'react'
import { connect } from 'react-redux'
import { simpleAction } from '../../store/actions/simpleAction'
import { loginUser } from '../../store/actions/loginAction'
import { Link } from 'react-router-dom'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap'
import './Header.css'

class Header extends Component {

  componentDidMount = async () => {
    let auth_token = localStorage.getItem('auth_token')
    this.setState({
      auth_token: auth_token
    })
    if (auth_token) {
      this.props.simpleAction(auth_token);
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      auth_token: nextProps.auth_token
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      modal: false,
      confirmModal: false,
      email: '',
      password: '',
      auth_token: ''
    }
    this.toggle = this.toggle.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.confirmModal = this.confirmModal.bind(this)
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  toggleLoginModal() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  confirmModal() {
    this.setState(prevState => ({
      confirmModal: !prevState.confirmModal
    }));
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  loginUser = async (e) => {
    e.preventDefault()
    await this.props.loginUser(this.state)
    let auth_token = null
    if (await this.props.auth_token && this.props.auth_token.result) {
      auth_token = this.props.auth_token.result.auth_token
    }
    await console.log('local', auth_token)
    await this.setState({
      auth_token: auth_token
    })
    if (this.state.auth_token === auth_token) {
      this.setState(prevState => ({
        confirmModal: !prevState.confirmModal,
        modal: !prevState.modal
      }));
    }
  }
  logOut = () => {
    console.log('test')
    localStorage.removeItem("auth_token");
    this.setState({
      auth_token: null
    })
  }
  render() {
    const { auth_token } = this.state
    console.log('token', this.state.auth_token && this.state.auth_token.result ? this.state.auth_token.result.auth_token : null)
    console.log('user', this.state)

    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to='/'>reactstrap</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink >Flowers</NavLink>
              </NavItem>
              <NavItem>
                <NavLink >Latest Sightings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink >Favorites</NavLink>
              </NavItem>
              {auth_token !== null ? <NavItem>
                <NavLink onClick={this.logOut}>Logout</NavLink>
              </NavItem> : <NavItem>
                  <NavLink onClick={this.toggleLoginModal}>Login</NavLink>
                </NavItem>}
              {auth_token !== null ? <NavItem>
                <NavLink className="new-account">{this.props.user ? <Link to='/profile'>{this.props.user.user.first_name}</Link> : <span>Error</span>}</NavLink>
              </NavItem> : <NavItem>
                  <NavLink className="new-account">New Account</NavLink>
                </NavItem>}

            </Nav>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggleLoginModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleLoginModal}>Welcome Back</ModalHeader>
          <ModalBody>
            <form>
              <input onChange={(e) => this.handleChange(e)} name='email' type="email" placeholder="email" />
              <input onChange={(e) => this.handleChange(e)} name='password' type="password" placeholder="password" />
              <button onClick={this.loginUser}>Login</button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleLoginModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleLoginModal}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.confirmModal} toggle={this.confirmModal} className={this.props.className}>
          <ModalHeader toggle={this.confirmModal}>Welcome Back</ModalHeader>
          <ModalBody>
            Confirm
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.confirmModal}>Ok</Button>{' '}
            <Button color="secondary">Profile</Button>
          </ModalFooter>
        </Modal>

      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.simpleReducer.result,
  auth_token: state.loginReducer
})

const mapDispatchToProps = dispatch => ({
  simpleAction: (token) => dispatch(simpleAction(token)),
  loginUser: (data) => dispatch(loginUser(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)