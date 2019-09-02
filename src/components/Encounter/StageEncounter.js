import React, { Component } from 'react';
import CharacterStageList from "../characters/CharacterStageList";
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
        const {uid, characters} = this.props;
        if (!uid) {
            return <Redirect to='/signin'/>
        }
        if (characters) {
            return (
                <div className='dashboard container'>
                    <span className='page-header'>Add To Your Encounter</span>
                    <div className='row'>
                        <div className='col s12 center-align'>
                            <CharacterStageList onPress={this.updateRemoveEncounterCharacter} characters={characters}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container center">
                    <div className="preloader-wrapper big active">
                        <div className="spinner-layer spinner-red-only">
                            <div className="circle-clipper left">
                                <div className="circle"></div>
                            </div>
                            <div className="gap-patch">
                                <div className="circle"></div>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        updateEncounterCharacter: (character) => dispatch(updateEncounterCharacter(character)),
        removeEncounterCharacter: (character) => dispatch(removeEncounterCharacter(character))
    }
};


const mapStateToProps = (state) => {
    return{
        characters: state.firestore.ordered.characters,
        auth: state.firebase.auth,
        uid: state.auth.uid
    }};
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect((props) => {
        return [{collection: 'characters', where: [['masterId', '==', props.uid]]}]
        }
    )
)(StageEncounter);