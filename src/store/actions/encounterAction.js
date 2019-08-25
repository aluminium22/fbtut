import firebase from '../../config/fbConfig'

export const updateEncounterCharacter = (character) => {
    return (dispatch, getState) => {
        // this.db.doc(`encounters/${id}`).update({character:$character});
        const userDoc = firebase.firestore().collection('users').doc(character.masterId);
        userDoc.get().then((doc) => {
            if (!doc.exists) {
                console.log('error no doc');
                const error = 'no doc found for user';
                dispatch({type: 'UPDATE_ENCOUNTER_ERROR', error});
            } else {
                const user = doc.data();
                firebase.firestore().collection(`encounters/${user.encounterId}/characters`).doc(character.id).set({
                    ...character,
                    encounterId: `${user.encounterId}`
                }).then(() => {
                    firebase.firestore().collection(`characters`).doc(character.id).update({
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
        const userDoc = firebase.firestore().collection('users').doc(character.masterId);
        userDoc.get().then((doc) => {
            if (!doc.exists) {
                console.log('error no doc');
                const error = 'no doc found for user';
                dispatch({type: 'UPDATE_ENCOUNTER_ERROR', error});
            } else {
                const user = doc.data();
                if (!encounterId) {
                    encounterId = user.encounterId
                }
                console.log('character id', character.id, user.encounterId);

                firebase.firestore().collection(`encounters/${user.encounterId}/characters`).doc(character.id).delete().then(() => {
                    console.log('deleted! I hope');
                        firebase.firestore().collection('characters').doc(character.id).update({
                            encounterId: ''
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

export const updateEncounter = (encounter) => {
    return (dispatch, getState) => {
        firebase.firestore().collection('encounters').doc(encounter.id).update({
            encounter: encounter
        }).then(() => {
            dispatch({type: 'UPDATE_ENCOUNTER', encounter});
            console.log('encounter', encounter);
        }).catch((error) => {
            dispatch({type: 'UPDATE_ENCOUNTER_ERROR', error});
        });

    }
};
