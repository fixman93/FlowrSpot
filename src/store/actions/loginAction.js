import axios from 'axios'
import { AUTH } from './actionTypes'
const session_url = 'http://flowrspot-api.herokuapp.com/api/v1/users/login'

export const loginUser = (data) => {
  return dispatch => {
    axios.post(session_url, { email: 'jack.oniell@poviolabs.com', password: 'rozica' }, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('dsada', response)
        dispatch({
          type: AUTH.LOGGED_IN,
          payload: response.data
        })
      })
  }
}