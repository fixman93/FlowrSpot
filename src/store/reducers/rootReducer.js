import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import loginReducer from './loginReducer'
import flowerReducer from './flowerReducer'
export default combineReducers({
  simpleReducer,
  loginReducer,
  flowerReducer
});