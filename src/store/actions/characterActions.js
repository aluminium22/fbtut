import firebase from '../../config/fbConfig'

export const updateCharacter = (character, history) => {
  return (dispatch, getState) => {
    console.log(firebase);
    firebase.firestore().collection('characters').doc(character.id).update({
      ...character
    }).then(() => {
      dispatch({type: 'UPDATE_CHARACTER', character});
      console.log('this.', character);
      history.push("/")
    }).catch((error) => {
      dispatch({type: 'UPDATE_CHARACTER_ERROR', error});
    });
  }
};

export const deleteCharacter = (character, id, history) => {
  return (dispatch, getState) => {
    console.log(firebase);
    firebase.firestore().collection('characters').doc(id).delete().then(() => {
      console.log('delete');
      dispatch({type: 'DELETE_CHARACTER', character});
      history.push("/characters")
    }).catch((error) => {
      dispatch({type: 'DELETE_CHARACTER_ERROR', error});
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
      playedRound: false,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_CHARACTER', character });
    }).catch((error) => {
      dispatch({ type: 'CREATE_CHARACTER_ERROR', error });
    });
  }
};

export const joinMaster = (email, characterId, character) => {
  console.log('email', email);
  return (dispatch, getState) => {
    firebase.firestore().collection("users").where('email', '==', email
    ).get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            firebase.firestore().collection('characters').doc(characterId).update({
              ...character,
              masterId: doc.id
            }).then(() => {
              dispatch({type: 'UPDATE_CHARACTER', character});
              console.log('this.', character);
            })
          });
        }).catch((error) => {
      console.log('failed');
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
      console.log('this.', character);
    }).catch((error) => {
      console.log('failed');
      dispatch({type: 'UPDATE_CHARACTER_ERROR', error});
    });
  }
};