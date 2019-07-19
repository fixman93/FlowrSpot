import axios from 'axios'
import { AUTH } from './actionTypes'
const session_url = 'http://flowrspot-api.herokuapp.com/api/v1/users/login'

export const loginUser = (data) => {
  return dispatch => {
    axios.post(session_url, { email: data.email, password: data.password }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('dsada', response)
        localStorage.setItem("auth_token", response.data.auth_token);
        dispatch({
          type: AUTH.LOGGED_IN,
          payload: response.data
        })
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}