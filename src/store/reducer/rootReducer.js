import authReducer from './authReducer';
import projectReducer from './projectReducer';
import {combineReducers} from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  project: projectReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;


