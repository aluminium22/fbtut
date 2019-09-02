const initState = {
    message: null,
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
          message: 'Rolled a nat 1 on that signup'
      };
    case 'LOGIN_SUCCESS':
      console.log('login success', action);
      return{
        ...state,
        uid: action.uid,
          message: 'Login Successful, high login modifier there'
      };
    case 'RE_AUTH':
      console.log('login reauth', action);
      return {
          uid: action.uid,
          message: null
      };
    case 'SIGNOUT_SUCCESS':
        console.log('signout success, nat 20!');
      return{
          ...state,
          message: 'Successfully signed out, nat 20!'
      };
    case 'SIGNUP_SUCCESS':
        console.log('signup success, nat 20!');
      return{
        ...state,
          message: 'sign up successful, nat 20!'
      };
    case 'SIGNUP_ERROR':
        return {
            ...state,
            message: action.error.message
        };
      case 'MESSAGE_AUTH':
          console.log('MESSAGE', action);
          return {
        ...state,
              message: action.message
      };
    default:
      return state;
  }
};

export default authReducer;