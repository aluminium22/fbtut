

const initState = {
    message: null,
  characters: [
  ]
};



const characterReducer = (state = initState, action) => {
  switch(action.type){
    case 'UPDATE_CHARACTER':
      console.log('update p', action.character);
        return {
            ...state,
            message: null
        };
    case 'CREATE_CHARACTER':
      console.log('created p', action.character);
        return {
            ...state,
            message: null
        };
      case 'DELETE_CHARACTER':
          console.log('update p', action.character);
          return {
              ...state,
              message: null
          };
      case 'DELETE_CHARACTER_CHARACTER':
          console.log('created p', action.character);
          return {
              ...state,
              message: null
          };
    case 'CREATE_CHARACTER_ERROR':
      console.log('error', action.error);
        return {
            ...state,
            message: action.error.message
        };
    case 'UPDATE_CHARACTER_ERROR':
      console.log('error', action.error);
        return {
            ...state,
            message: action.error.message
        };
      case 'MESSAGE_CHARACTER':
          console.log('MESSAGE', action);
          return {
              ...state,
              message: action.message
          };
    default:
      return state;

  }
};

export default characterReducer;