const initState = {
  authError: null,
  uid: null
};

const sessionStore = () => {

};

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authError: 'Login Failed'
      };
    case 'LOGIN_SUCCESS':
      console.log('login success', action);
      return{
        ...state,
        uid: action.uid,
        authError: null
      };
    case 'RE_AUTH':
      console.log('login reauth', action);
      return {
        uid: action.uid
      };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return{
        ...state
      };
    case 'SIGNUP_SUCCESS':
      console.log('signup success');
      return{
        ...state,
        authError: null
      };
    case 'SIGNUP_ERROR':
      console.log('signup error', action.err);
      return{
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;