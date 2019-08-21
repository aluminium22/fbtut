import firebase from '../../config/fbConfig'

export const updateCharacter = (character) => {
  return (dispatch, getState) => {
    console.log(firebase);
    firebase.firestore().collection('characters').doc(character.id).update({
      ...character
    }).then(() => {
      dispatch({type: 'UPDATE_CHARACTER', character});
    }).catch((error) => {
      dispatch({type: 'UPDATE_CHARACTER_ERROR', error});
    });
  }
};

export const createCharacter = (character) => {
  return (dispatch, getState) => {
    //make asunc call to database
    let user = firebase.auth().currentUser;
    console.log(user.uid);
    console.log(firebase);
    firebase.firestore().collection('characters').add({
      ...character,
      masterId: user.uid,
      userId: user.uid,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_CHARACTER', character });
    }).catch((error) => {
      dispatch({ type: 'CREATE_CHARACTER_ERROR', error });
    });
  }
};