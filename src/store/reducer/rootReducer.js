import authReducer from './authReducer';
import characterReducer from './characterReducer';
import {combineReducers} from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
  character: characterReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;


