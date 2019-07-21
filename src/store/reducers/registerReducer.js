import { AUTH } from '../actions/actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH.REGISTER_USER:
      return {
        result: action.payload
      }
    default:
      return state
  }
}