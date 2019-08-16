import firebase from '../../config/fbConfig'
export const createCharacter = (character) => {
  return (dispatch, getState) => {
    //make asunc call to database
    console.log(firebase)
    firebase.firestore().collection('characters').add({
      ...character,
      authorFirstName: 'net',
      authorLastName: 'dude',
      authorId: 12345,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_CHARACTER', character });
    }).catch((error) => {
      dispatch({ type: 'CREATE_CHARACTER_ERROR', error });
    });
  }
}