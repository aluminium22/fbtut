

const initState = {
  projects: [
    {id: '1', title: 'help me find peach', content: 'stfu sfoisdufoiusdf'},
    {id: '2', title: 'help me find peach', content: 'stfu sfoisdufoiusdf'},
    {id: '3', title: 'help me find peach', content: 'stfu sfoisdufoiusdf'}
  ]
};



const projectReducer = (state = initState, action) => {
  switch(action.type){
    case 'CREATE_PROJECT':
      console.log('created p', action.project);
  }
  return state
}

export default projectReducer;