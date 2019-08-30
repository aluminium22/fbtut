import characterReducer from "./characterReducer";

const initState = {
    encounter: {},
    characters: []
};


const encounterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_ENCOUNTER':
            console.log('update enc', action.encounter);
            return {
                ...state,
                encounter: action.encounter
            };
        case 'UPDATE_ENCOUNTER_CHARACTERS':
            console.log('update enc', action.character);
            return {
                ...state,
                characters: action.character
            };
        case 'UPDATE_ENCOUNTER_ERROR':
            console.log('error', action.error);
            return state;
        default:
            return state;

    }
};

export default encounterReducer;
