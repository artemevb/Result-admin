import { combineReducers } from 'redux';
import dataReducerRu from './dataReducerRu';
import dataReducerUz from './dataReducerUz';

const rootReducer = combineReducers({
  dataRu: dataReducerRu,
  dataUz: dataReducerUz,
});

export default rootReducer;
