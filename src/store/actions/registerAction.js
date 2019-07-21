import axios from 'axios'
import { AUTH } from './actionTypes'
const session_url = 'http://flowrspot-api.herokuapp.com/api/v1/users/register'

export const registerUser = (data) => {
  console.log('register action', data)
  return dispatch => {
    var formData = new FormData();

    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('date_of_birth', '11/09/1993');
    formData.append('email', data.emailRegister);
    formData.append('password', data.passwordRegister);
    console.log('bodyFormDate', formData)
    console.log(formData.get('first_name'))
    axios.post(session_url, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then((response) => {
        console.log('dsada', response)
        localStorage.setItem("auth_token_register", response.data.auth_token);
        dispatch({
          type: AUTH.REGISTER_USER,
          payload: response.data
        })
      })
      .catch((error) => {
        console.log('err', error)
      })
  }
}