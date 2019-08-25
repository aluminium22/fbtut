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

    calculateTurn = (encounter) => {
        console.log('in calculate turn');
        if (!encounter.ind) {
            encounter.ind = 0;
        }
        if (encounter.turn) {
            console.log('first');
            encounter.turn = encounter.characters[0];
            this.props.updateEncounter(encounter)
        } else {
            console.log('2 ');
            if (encounter.ind !== encounter.characters.length - 1) {
                encounter.turn = encounter.characters[encounter + 1];
                this.props.updateEncounter(encounter)
            } else {
                console.log('3 ');
                encounter.ind = 0;
                encounter.turn = encounter.characters[0];
                this.props.updateEncounter(encounter)
            }
        }
    };

    render() {
        const {encounter, auth} = this.props;
        if (encounter && encounter.characters) {
            encounter.characters = this.sortCharacter(encounter.characters);
            console.log('encounter', encounter);
            if (!auth.uid) {
                return <Redirect to='/signin'/>
            }
            return (
                <div className='dashboard container'>
                    <div className='row'>
                        <div className='col s12'>
                            <EncounterCharacterList onPress={this.handleCharacterPress}
                                                    characters={encounter.characters}/>
                        </div>
                    </div>
                    {!encounter.turn &&
                    <div>
                        <a onClick={() => this.calculateTurn(encounter)}
                           className='waves-effect waves-light red btn'>Start</a>
                    </div>
                    }
                    {encounter.turn &&
                    <div>
                        <a onClick={this.calculateTurn(encounter)}
                           className='waves-effect waves-light red btn'>Next</a>
                    </div>
                    }
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
    const encounters = state.firestore.data.encounters;
    let encounter = encounters ? encounters[id] : null;
    return {
        encounterId: id,
        encounter: encounter,
        auth: state.firebase.auth
    }
};
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect((props) => {
            return [`encounters/${props.encounterId}`]
        }
    )
)(Encounter);