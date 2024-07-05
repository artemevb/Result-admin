import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer'; // Путь к вашему редьюсеру

export default combineReducers({
  example: exampleReducer,
});
