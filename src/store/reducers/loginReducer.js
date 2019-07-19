import { AUTH } from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH.LOGGED_IN:
      return {
        result: action.payload
      }
    default:
      return state
  }
}