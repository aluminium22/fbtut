import authReducer from './authReducer';
import projectReducer from './projectReducer';
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  project: projectReducer,
  auth: authReducer
})

export default rootReducer;


