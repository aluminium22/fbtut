import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {ReactReduxFirebaseProvider, authIsReady} from 'react-redux-firebase';
import { createFirestoreInstance} from 'redux-firestore';
import rootReducer from './store/reducer/rootReducer';
import 'firebase/firestore';
import 'firebase/auth';
import App from './App';
import ReactDOM from "react-dom";

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(thunk));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

setTimeout(() => ReactDOM.render(<Provider store={store}>
  <ReactReduxFirebaseProvider {...rrfProps}>
    <App/>
  </ReactReduxFirebaseProvider>
</Provider>, document.getElementById('root')), 200);


