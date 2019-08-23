import React, { Component } from 'react';
import CharacterList from "../characters/CharacterList";
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
import firebase from '../../config/fbConfig'

const Characters = (props) => {
    const {characters, auth} = props;
    if (characters) {
        if (!auth.uid) {
            return <Redirect to='/signin'/>
        }
        return (
            <div className='dashboard container'>
                <div className='row'>
                    <div className='col s12 center-align'>
                        <CharacterList characters={characters}/>
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
};

const mapStateToProps = (state) => {
    return{
        characters: state.firestore.ordered.characters,
        auth: state.firebase.auth
    }};
export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
            return [{collection: 'characters', where: [['masterId', '==', firebase.auth().currentUser.uid]]}]
        }
    )
)(Characters);