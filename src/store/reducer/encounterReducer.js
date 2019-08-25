import characterReducer from "./characterReducer";

const initState = {
    encounters: [],
    characters: []
};


const encounterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_ENCOUNTER':
            console.log('update enc', action.character);
            return state;
        case 'UPDATE_ENCOUNTER_CHARACTER':
            console.log('update enc', action.character);
            return state;
        case 'UPDATE_ENCOUNTER_ERROR':
            console.log('error', action.error);
            return state;
        default:
            return state;

    }
};

export default encounterReducer;
