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

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Create store with reducers and initial state
const initialState = {};
const store = createStore(rootReducer, initialState, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};
firebase.auth().onAuthStateChanged(() => {
  ReactDOM.render(<Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App/>
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root'))
});


