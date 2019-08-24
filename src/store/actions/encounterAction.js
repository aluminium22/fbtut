import firebase from '../../config/fbConfig'

export const updateEncounterCharacter = (character) => {
    return (dispatch, getState) => {
        // this.db.doc(`encounters/${id}`).update({character:$character});
        const userDoc = firebase.firestore().collection('users').doc(character.userId);
        userDoc.get().then((doc) => {
            if (!doc.exists) {
                console.log('error no doc');
                const error = 'no doc found for user';
                dispatch({type: 'UPDATE_ENCOUNTER_ERROR', error});
            } else {
                const user = doc.data();
                firebase.firestore().collection(`encounters`).doc(user.encounterId).update({characters: firebase.firestore.FieldValue.arrayUnion(character)})
                    .then(() => {
                        firebase.firestore().collection('characters').doc(character.id).update({
                            ...character,
                            encounterId: `${user.encounterId}`
                        }).then(() => {
                            dispatch({type: 'UPDATE_ENCOUNTER_CHARACTER', character});
                            console.log('this.', character);
                        })
                    }).catch((error) => {
                    dispatch({type: 'UPDATE_ENCOUNTER_ERROR', error});
                });
            }
        })
    }
};
export const removeEncounterCharacter = (character, encounterId) => {
    return (dispatch, getState) => {
        const userDoc = firebase.firestore().collection('users').doc(character.userId);
        userDoc.get().then((doc) => {
            if (!doc.exists) {
                console.log('error no doc');
                const error = 'no doc found for user';
                dispatch({type: 'UPDATE_ENCOUNTER_ERROR', error});
            } else {
                const user = doc.data();
                console.log('character id', character.id);
                if (!encounterId) {
                    encounterId = user.encounterId
                }
                const encounterDoc = firebase.firestore().collection('encounters').doc(encounterId);
                encounterDoc.get().then((eDoc) => {
                    const encounter = eDoc.data();
                    firebase.firestore().collection(`encounters`).doc(user.encounterId).update({
                        characters: encounter.characters.filter(characterN => characterN.id !== character.id)
                    }).then(() => {
                        firebase.firestore().collection('characters').doc(character.id).update({
                            ...character,
                            encounterId: ''
                        }).then(() => {
                            dispatch({type: 'UPDATE_ENCOUNTER_CHARACTER', character});
                            console.log('this.', character);
                        })
                    }).catch((error) => {
                        dispatch({type: 'UPDATE_ENCOUNTER_ERROR', error});
                    });
                })
            }
        })
    }
};
