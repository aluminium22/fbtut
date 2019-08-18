import React, { Component } from 'react';
import CharacterList from "../characters/CharacterList";
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';


class Characters extends Component {
    render() {
        const { characters, auth } = this.props;
        if(!auth.uid){
            return <Redirect to='/signin' />
        }
        return(
            <div className='dashboard container'>
                <div className='row'>
                    <div className='col s5 offset-s7'>
                        <Link className="waves-effect red darken-4 btn-large" to={'/create'}>
                            <span>New Character</span>
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col s12 center-align'>
                        <CharacterList characters={characters} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        characters: state.firestore.ordered.characters,
        auth: state.firebase.auth
    }};
export default compose(
    firestoreConnect(['characters']),
    connect(mapStateToProps)
)(Characters);