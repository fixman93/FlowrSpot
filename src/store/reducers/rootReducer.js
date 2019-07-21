import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import loginReducer from './loginReducer'
import flowerReducer from './flowerReducer'
import registerReducer from './registerReducer'
export default combineReducers({
  simpleReducer,
  loginReducer,
  flowerReducer,
  registerReducer
});