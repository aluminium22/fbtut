import React from 'react';
import firebase from '../../config/fbConfig'
import {firestore} from "firebase";

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

export const signUp = (newUser) => {
  return ( dispatch, getState) => {
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      console.log('resp',resp)
      return firebase.firestore().collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(() => {
      dispatch({type: 'SIGNUP_SUCCESS'})
    }).catch( err => {
      dispatch({ type: 'SIGNUP_ERROR', err})
    })
  }
};

