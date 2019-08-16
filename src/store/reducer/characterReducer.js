

const initState = {
  characters: [
    {id: '1', title: 'help me find peach', content: 'stfu sfoisdufoiusdf'},
    {id: '2', title: 'help me find peach', content: 'stfu sfoisdufoiusdf'},
    {id: '3', title: 'help me find peach', content: 'stfu sfoisdufoiusdf'}
  ]
};



const characterReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATE_CHARACTER':
      console.log('created p', action.character);
      return state;
    case 'CREATE_CHARACTER_ERROR':
      console.log('error', action.error)
      return state;
    default:
      return state;

  }
}

export default characterReducer;