import firebase from '../../config/fbConfig'

export const updateCharacter = (character, history) => {
  return (dispatch, getState) => {
    firebase.firestore().collection('characters').doc(character.id).update({
      ...character
    }).then(() => {
      if (character.encounterId) {
        firebase.firestore().collection(`encounters/${character.encounterId}/characters`).doc(character.id).update({
          ...character
        }).then(() => {
          dispatch({type: 'UPDATE_CHARACTER', character});
          history.push("/")
        })
      } else {
        dispatch({type: 'UPDATE_CHARACTER', character});
        history.push("/")
      }
    }).catch((error) => {
      dispatch({type: 'UPDATE_CHARACTER_ERROR', error});
    });
  }
};

export const deleteCharacter = (character, id, history) => {
  return (dispatch, getState) => {
    firebase.firestore().collection('characters').doc(id).delete().then(() => {
      dispatch({type: 'DELETE_CHARACTER', character});
      history.push("/characters")
    }).catch((error) => {
      dispatch({type: 'DELETE_CHARACTER_ERROR', error});
    });
  }
};

export const createCharacter = (character, history) => {
  return (dispatch, getState) => {
    //make asunc call to database
    let user = firebase.auth().currentUser;
    firebase.firestore().collection('characters').add({
      ...character,
      masterId: user.uid,
      userId: user.uid,
      playedRound: false,
      createdAt: new Date()
    }).then(() => {
      history.push("/characters");
      dispatch({ type: 'CREATE_CHARACTER', character });
    }).catch((error) => {
      dispatch({ type: 'CREATE_CHARACTER_ERROR', error });
    });
  }
};

export const joinMaster = (email, characterId, character) => {
  return (dispatch, getState) => {
    firebase.firestore().collection("users").where('email', '==', email
    ).get().then(function (querySnapshot) {
      if (querySnapshot.empty) {
        const error = {};
        error.message = 'nat 1 investigation, failure to find GM';
        dispatch({type: 'UPDATE_CHARACTER_ERROR', error});
      }
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            firebase.firestore().collection('characters').doc(characterId).update({
              ...character,
              masterId: doc.id
            }).then(() => {
              dispatch({type: 'UPDATE_CHARACTER', character});
            })
          });
        }).catch((error) => {
      dispatch({type: 'UPDATE_CHARACTER_ERROR', error});
    });
  }
};

export const detachMaster = (character) => {
  return (dispatch, getState) => {
    let user = firebase.auth().currentUser;
    firebase.firestore().collection('characters').doc(character.id).update({
      ...character,
      masterId: user.uid,
    }).then(() => {
      dispatch({type: 'UPDATE_CHARACTER', character});
    }).catch((error) => {
      dispatch({type: 'UPDATE_CHARACTER_ERROR', error});
    });
  }
};

export const updateMessage = (message) => {
  return (dispatch, getState) => {
    dispatch({type: 'MESSAGE_CHARACTER', message})
  }
};
