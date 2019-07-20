export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_FLOWER':
      console.log('rrrrr', action.payload)
      return {
        result: action.payload
      }
    default:
      return state
  }
}