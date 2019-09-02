import React from 'react';
import firebase from '../../config/fbConfig'
import {firestore} from "firebase";

export const signIn = (credentials) => {
  return ( dispatch, getState) => {
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
        credentials.password,
    ).then((response) => {
      const uid = response.user.uid;
      dispatch({type: 'LOGIN_SUCCESS', uid})
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
    firebase.firestore().collection('encounters').add(
        {
          sharedRoll: null,
          turn: null,
        }
    ).then((docRef) => {
      firebase.auth().createUserWithEmailAndPassword(
          newUser.email,
          newUser.password
      ).then((resp) => {
        return firebase.firestore().collection('users').doc(resp.user.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          encounterId: docRef.id,
          initials: newUser.firstName[0] + newUser.lastName[0]
        })
      }).then(() => {
        dispatch({type: 'SIGNUP_SUCCESS'})
      }).catch(err => {
        dispatch({type: 'SIGNUP_ERROR', err})
      })
    })
  }
};

export const reAuth = (uid) => {
  return (dispatch, getState) => {
    dispatch({type: 'RE_AUTH', uid})
  }
};

export const updateMessage = (message) => {
  return (dispatch, getState) => {
    dispatch({type: 'MESSAGE_AUTH', message})
  }
};