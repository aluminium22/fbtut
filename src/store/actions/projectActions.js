export const createProject = (project) => {
  return (dispatch, getState) => {
    //make asunc call to database
    dispatch({ type: 'CREATE_PROJECT', project });
  }
}