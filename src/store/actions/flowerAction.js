import axios from 'axios';

var session_url = 'http://flowrspot-api.herokuapp.com/api/v1/flowers';
// axios.defaults.headers.common['Authorization'] = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMywiZXhwIjoxNTYzNjIwODQwfQ.G2RvMxMgtcs5_i9mE5ZtCWCklE8n5MqcRXsOqS7iW7w';


export const getFlower = () => {
  return dispatch => {
    axios.get(session_url).then(function (response) {
      console.log('flowerrrrr', response)
      dispatch({
        type: 'FETCH_FLOWER',
        payload: response.data
      })
    }).catch(function (error) {
      dispatch({
        type: 'FETCH_FLOWER_ERROR',
        payload: error
      })
    })
  }

}