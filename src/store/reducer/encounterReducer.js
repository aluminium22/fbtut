import characterReducer from "./characterReducer";

const initState = {
    message: null,
    encounter: {},
    characters: []
};


const encounterReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATE_ENCOUNTER':
            console.log('update enc', action.encounter);
            return {
                ...state,
                encounter: action.encounter,
                message: 'Encounter Updated!'
            };
        case 'UPDATE_ENCOUNTER_CHARACTERS':
            console.log('update enc', action.character);
            return {
                ...state,
                characters: action.character,
                message: 'Character in Encounter Updated!'
            };
        case 'UPDATE_ENCOUNTER_ERROR':
            return {
                ...state,
                characters: action.character,
                message: 'Rolled a nat 1 on that'
            };
        case 'MESSAGE_ENCOUNTER':
            console.log('MESSAGE', action);
            return {
                ...state,
                message: action.message
            };
        default:
            return state;

    }
};

export default encounterReducer;
