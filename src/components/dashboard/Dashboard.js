import React, { Component } from 'react';
import CharacterList from "../characters/CharacterList";
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
import firebase from '../../config/fbConfig'


class Dashboard extends Component {
  render() {
    const {characters, uid, auth} = this.props;
    if (!uid) {
      return <Redirect to='/signin' />
    }
    return(
      <div className='dashboard container'>
        <div className='row'>
          <div className='col s12 m12 l6 center-align'>
            <div>
              <ul>
                <Link className="waves-effect red darken-4 btn-large" to={'/master'}>
                  <span>Your Encounter</span>
                </Link>
              </ul>
              <ul>
                <Link className="waves-effect red darken-4 btn-large hide-on-large-only" to={'/characters'}>
                  <span>Your Characters</span>
                </Link>
              </ul>
              <ul>
                <Link className="waves-effect red darken-4 btn-large" to={'/dice'}>
                  <span>Dice</span>
                </Link>
              </ul>
            </div>
          </div>
          <div className='col s12 m12 l6 center-align hide-on-med-and-down'>
            <CharacterList characters={characters}/>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return{
  characters: state.firestore.ordered.characters,
    auth: state.firebase.auth,
    uid: state.auth.uid
}};
export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
      if (props.uid) {
        return [{collection: 'characters', where: [['userId', '==', props.uid]]}]
      }
        }
    ),
)(Dashboard);