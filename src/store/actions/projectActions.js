import firebase from '../../config/fbConfig'
export const createProject = (project) => {
  return (dispatch, getState) => {
    //make asunc call to database
    console.log(firebase)
    firebase.firestore().collection('projects').add({
      ...project,
      authorFirstName: 'net',
      authorLastName: 'dude',
      authorId: 12345,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT', project });
    }).catch((error) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', error });
    });
  }
}