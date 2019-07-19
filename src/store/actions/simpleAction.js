import axios from 'axios';

var session_url = 'http://flowrspot-api.herokuapp.com/api/v1/users/me';
// axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNTYzNjIwODQwfQ.G2RvMxMgtcs5_i9mE5ZtCWCklE8n5MqcRXsOqS7iW7w';


export const simpleAction = (token) => {
  return dispatch => {
    axios.get(session_url, { headers: { 'Authorization': token } }).then(function (response) {
      dispatch({
        type: 'SIMPLE_ACTION',
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: 'SIMPLE_ACTION_ERROR',
        payload: error
      })
    })
  }

}