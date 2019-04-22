import React from 'react';
import firebase from '../../config/fbConfig'

export const signIn = (credentials) => {
  return ( dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'LOGIN_SUCCESS'})
    }).catch((err) => {
      dispatch({type: 'LOGIN_ERROR', err});
    })
  }
};

export const signOut = () => {
  return ( dispatch, getState) => {
    firebase.auth().signOut().then(() => {
      dispatch({type: 'SIGNOUT_SUCCESS'})
    }).catch((err) => {
      dispatch({type: 'SIGNOUT_ERROR', err});
    })
  }
};

