import React from 'react';
import { Provider } from 'react-redux';
import firebase from 'firebase/app';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import { createFirestoreInstance} from 'redux-firestore';
import rootReducer from './store/reducer/rootReducer';
import 'firebase/firestore';
import 'firebase/auth';
import App from './App';
import ReactDOM from "react-dom";
import {loadState, saveState} from "./localStorage";

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// const persistedState = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
// Create store with reducers and initial state

const customMiddleWare = store => next => action => {
  switch (action.type) {
    case '@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED':
      const newId = loadState();
      if (newId) {
        const uid = newId;
        store.dispatch({type: 'RE_AUTH', uid})
      }
      break;
    case 'RE_AUTH':
      if (loadState() !== action.uid) {
        const uid = action.uid;
        saveState(uid);
        store.dispatch({type: 'RE_AUTH', uid})
      }
  }
  next(action)
};

console.log('auth ');
const initialState = {};
const store = createStore(rootReducer, initialState, applyMiddleware(thunk, customMiddleWare));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

  ReactDOM.render(<Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App/>
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root'));



