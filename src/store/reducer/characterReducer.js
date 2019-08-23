

const initState = {
  characters: [
  ]
};



const characterReducer = (state = initState, action) => {
  switch(action.type){
    case 'UPDATE_CHARACTER':
      console.log('update p', action.character);
      return state;
    case 'CREATE_CHARACTER':
      console.log('created p', action.character);
      return state;
      case 'DELETE_CHARACTER':
          console.log('update p', action.character);
          return state;
      case 'DELETE_CHARACTER_CHARACTER':
          console.log('created p', action.character);
          return state;
    case 'CREATE_CHARACTER_ERROR':
      console.log('error', action.error);
      return state;
    case 'UPDATE_CHARACTER_ERROR':
      console.log('error', action.error);
      return state;
    default:
      return state;

  }
};

export default characterReducer;