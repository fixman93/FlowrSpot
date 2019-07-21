import React, { Component } from 'react'
import { connect } from 'react-redux'
import { simpleAction } from '../../store/actions/simpleAction'
import { loginUser } from '../../store/actions/loginAction'
import { registerUser } from '../../store/actions/registerAction'
import { Link } from 'react-router-dom'

import Logo from '../../assets/pl-logo.svg'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col, Row, Form, FormGroup, Label, Input
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
      profileModal: false,
      confirmModal: false,
      registerModal: false,
      email: '',
      password: '',
      auth_token: '',
      first_name: '',
      last_name: '',
      date_of_birth: '',
      passwordRegister: '',
      emailRegister: ''
    }
    this.toggle = this.toggle.bind(this)
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.confirmModal = this.confirmModal.bind(this)
    this.profileModal = this.profileModal.bind(this)
    this.registerModal = this.registerModal.bind(this)
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

  profileModal() {
    this.setState(prevState => ({
      profileModal: !prevState.profileModal,
      confirmModal: false
    }));
  }

  registerModal() {
    this.setState(prevState => ({
      registerModal: !prevState.registerModal
    }))
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  loginUser = async (e) => {
    e.preventDefault()
    this.props.loginUser(this.state)
    let auth_token = null
    if (this.props.auth_token && this.props.auth_token.result) {
      auth_token = this.props.auth_token.result.auth_token
    }
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
    localStorage.removeItem("auth_token");
    this.setState(prevState => ({
      auth_token: null,
      profileModal: !prevState.profileModal
    }));
  }

  registerUser = (e) => {
    e.preventDefault()
    this.props.registerUser(this.state)
    let auth_token_register = localStorage.getItem('auth_token_register')
    if (auth_token_register) {
      this.setState(prevState => ({
        registerModal: !prevState.registerModal,
        modal: !prevState.modal
      }));
    }
  }
  render() {
    const { auth_token } = this.state
    console.log('user info', this.props.user)
    return (
      <div>
        <Navbar color="light" light expand="md">
          <Link to='/'><img src={Logo} alt="Logo" /></Link>
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
              {auth_token !== null ? null : <NavItem>
                <NavLink onClick={this.toggleLoginModal} className="loginBtn">Login</NavLink>
              </NavItem>}
              {auth_token !== null ? <NavItem>
                <NavLink className="UserProfile">{this.props.user ? <span onClick={this.profileModal}> {this.props.user.user.first_name} <img src='https://via.placeholder.com/50' alt='User' /></span> : <span>Name <img src='https://via.placeholder.com/50' alt='User' /></span>}</NavLink>
              </NavItem> : <NavItem>
                  <NavLink className="new-account" onClick={this.registerModal}>New Account</NavLink>
                </NavItem>}

            </Nav>
          </Collapse>
        </Navbar>
        <Modal isOpen={this.state.modal} toggle={this.toggleLoginModal} className={this.props.className + ' loginModal'}>
          <ModalHeader toggle={this.toggleLoginModal}>Welcome Back</ModalHeader>
          <ModalBody>

            <Form>
              <FormGroup>
                <Label for="emailAddress">Email</Label>
                <Input onChange={(e) => this.handleChange(e)} name='email' type="email" id="emailAddress" placeholder="" />
              </FormGroup>
              <FormGroup>
                <Label for="PasswordLogin">Address 2</Label>
                <Input onChange={(e) => this.handleChange(e)} name='password' type="password" id="PasswordLogin" placeholder="" />
              </FormGroup>
            </Form>
            <Button color="secondary" onClick={this.loginUser}>Login to your Account</Button>{' '}
          </ModalBody>
          {/* <ModalFooter>

            <Button color="secondary" onClick={this.toggleLoginModal}>Cancel</Button>
          </ModalFooter> */}
        </Modal>

        <Modal isOpen={this.state.confirmModal} toggle={this.confirmModal} className={this.props.className + ' loginModal successfully'}>
          <ModalHeader toggle={this.confirmModal}>Welcome Back</ModalHeader>
          <ModalBody>
            Congratulations! You have successfully logged into FlowrSpot!
            <Button color="secondary" onClick={this.confirmModal}>Ok</Button>{' '}
            <Button color="secondary" onClick={this.profileModal}>Profile</Button>
          </ModalBody>

        </Modal>

        <Modal isOpen={this.state.profileModal} toggle={this.profileModal} className={this.props.className + ' profileModal'}>
          <ModalBody>
            <div className="profile-image">
              <img src="https://via.placeholder.com/50" alt="User" />
              <div className="user-name">
                {this.props.user ? this.props.user.user.first_name : null}
              </div>
            </div>
            <Form className="profile-modal">
              <FormGroup>
                <Label for="exampleAddress">First Name</Label>
                <Input type="text" name="first_name" id="exampleAddress" disabled placeholder="First Name" defaultValue={this.props.user ? this.props.user.user.first_name : ''} />
              </FormGroup>
              <FormGroup>
                <Label for="exampleAddress2">Last Name</Label>
                <Input type="text" name="last_name" id="exampleAddress2" disabled placeholder="Last Name" defaultValue={this.props.user ? this.props.user.user.last_name : ''} />
              </FormGroup>

            </Form>
            <div className="text-center"><Button color="secondary" onClick={this.logOut}>Logout</Button></div>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.registerModal} toggle={this.registerModal} className={this.props.className + ' loginModal'}>
          <ModalHeader toggle={this.registerModal}>Create an Account</ModalHeader>
          <ModalBody>
            <Form>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" onChange={(e) => this.handleChange(e)} name="first_name" id="firstName" placeholder="" />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" onChange={(e) => this.handleChange(e)} name="last_name" id="lastName" placeholder="" />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="emailAddress">Email</Label>
                <Input type="email" onChange={(e) => this.handleChange(e)} name="emailRegister" id="emailAddress" placeholder="" />
              </FormGroup>
              <FormGroup>
                <Label for="Password">Password</Label>
                <Input type="password" onChange={(e) => this.handleChange(e)} name="passwordRegister" id="Password" placeholder="" />
              </FormGroup>
            </Form>
            <Button color="secondary" onClick={this.registerUser}>Create Account</Button>
          </ModalBody>
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
  loginUser: (data) => dispatch(loginUser(data)),
  registerUser: (data) => dispatch(registerUser(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Header)