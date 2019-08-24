import React, { Component } from 'react';
import CharacterList from "../characters/CharacterList";
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
import firebase from '../../config/fbConfig'
import {updateEncounterCharacter, removeEncounterCharacter} from "../../store/actions/encounterAction";

class StageEncounter extends Component {
    updateRemoveEncounterCharacter = (character, type) => {
        if (type === 'add') {
            this.props.updateEncounterCharacter(character);
        } else {
            this.props.removeEncounterCharacter(character);
            console.log('remove me!')
        }
    };

    render() {
        const {characters, auth} = this.props;
        if (characters) {
            if (!auth.uid) {
                return <Redirect to='/signin'/>
            }
            return (
                <div className='dashboard container'>
                    <div className='row'>
                        <div className='col s12 center-align'>
                            <CharacterList onPress={this.updateRemoveEncounterCharacter} characters={characters}/>
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


const hasUser = () => {
    if (firebase.auth().currentUser) {
        return ({collection: 'characters', where: [['userId', '==', firebase.auth().currentUser.uid]]})
    } else {
        return 'characters';
    }

};
const mapDispatchtoProps = (dispatch) => {
    return {
        updateEncounterCharacter: (character) => dispatch(updateEncounterCharacter(character)),
        removeEncounterCharacter: (character) => dispatch(removeEncounterCharacter(character))
    }
};


const mapStateToProps = (state) => {
    return{
        characters: state.firestore.ordered.characters,
        auth: state.firebase.auth
    }};
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect((props) => {
        return [hasUser()]
        }
    )
)(StageEncounter);