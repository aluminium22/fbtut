import React, { Component } from 'react';
import CharacterList from "../characters/CharacterList";
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
import firebase from '../../config/fbConfig'
import {detachMaster} from "../../store/actions/characterActions";
import {removeEncounterCharacter, getEncounter} from "../../store/actions/encounterAction";


class Characters extends Component {

    detach = (character) => {
        this.props.detachMaster(character)
    };

    removeEncounter = (character, encounterId) => {
        this.props.removeEncounterCharacter(character, encounterId);
    };

    updateEncounter = (character) => {
        this.props.getEncounter(character, this.props.history);
    };

    render() {
        const { characters, auth } = this.props;
        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }
        if (characters) {
            return (
                <div className='dashboard container'>
                    <div className='row'>
                        <div className='col s7'>
                            <span className='page-header'>Your Characters</span>
                        </div>
                        <div className='col s5'>
                            <Link className="waves-effect red darken-4 btn-large margin-top16" to={'/create'}>
                                <span>New Character</span>
                            </Link>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col s12 center-align'>
                            <CharacterList detachMaster={this.detach} updateEncounter={this.updateEncounter}
                                           removeEncounter={this.removeEncounter}
                                           characters={characters}/>
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
        return '';
    }

};

const mapDispatchtoProps = (dispatch) => {
    return {
        detachMaster: (character) => dispatch(detachMaster(character)),
        removeEncounterCharacter: (character, encounterId) => dispatch(removeEncounterCharacter(character, encounterId)),
        getEncounter: (character, history) => dispatch(getEncounter(character, history))

    }
};

const mapStateToProps = (state) => {
    return{
        characters: state.firestore.ordered.characters,
        auth: state.firebase.auth
    }};
export default compose(
    firestoreConnect((props) => {
        return [hasUser()]
        }
    ),
    connect(mapStateToProps, mapDispatchtoProps)
)(Characters);