// src/reducers/index.js
import { combineReducers } from 'redux';
import caseReducer from './caseReducer';

const rootReducer = combineReducers({
  case: caseReducer,
});

export default rootReducer;
