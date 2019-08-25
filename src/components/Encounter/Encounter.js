import React, {Component} from 'react';
import EncounterCharacterList from "./EncounterCharacterList";
import connect from "react-redux/es/connect/connect";
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
import {updateEncounter} from "../../store/actions/encounterAction";

import firebase from '../../config/fbConfig'

class Encounter extends Component {
    handleCharacterPress = (character, type) => {
        if (type === 'add') {
            this.props.updateEncounterCharacter(character);
        } else {
            this.props.removeEncounterCharacter(character);
            console.log('remove me!')
        }
    };

    sortCharacter(characters) {
        return characters.sort((a, b) => (parseFloat(a.initiative) > parseFloat(b.initiative)) ? -1 : 1)
    }

    render() {
        const {encounter, auth} = this.props;
        if (encounter) {
            encounter.characters = this.sortCharacter(encounter.characters);
            console.log('characters----->', encounter);
            if (!auth.uid) {
                return <Redirect to='/signin'/>
            }
            return (
                <div className='dashboard container'>
                    <div className='row'>
                        <div className='col s12'>
                            <EncounterCharacterList encounter={encounter.turn} characters={encounter.characters}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <p> Loading </p>
                </div>
            )
        }
    }
}


const mapDispatchtoProps = (dispatch) => {
    return {
        updateEncounter: (encounter) => dispatch(updateEncounter(encounter)),
    }
};


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const encounters = state.firestore.ordered.encounters;
    const encounter = encounters ? encounters[0] : null;
    console.log('encounters', encounters);
    return {
        encounterId: id,
        encounter: encounter,
        auth: state.firebase.auth
    }
};
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect((props) => {
        return [{
            collection: 'encounters',
            doc: props.encounterId,
            subcollections: [
                {
                    collection: 'characters',
                    orderBy: ['initiative', 'desc',],
                }
            ]
        }]
        }
    ),
)(Encounter);


// limit: 1,
// orderBy: ['timestamp', 'desc',],
// storeAs: 'settings',