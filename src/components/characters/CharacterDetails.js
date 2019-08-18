import React from 'react';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";
import {Link, Redirect} from 'react-router-dom';

const CharacterDetails = (props) => {
  const { auth, character } = props;
  if(!auth.uid){
    return <Redirect to='/signin' />
  }  if(character){
    return(
      <div className="container section character-details">
          <div className='row'>
              <div className='col s12 m6 center-align'>
                  <Link className="waves-effect red darken-4 btn-large" to={'/create'}>
                      <span>Encounter</span>
                  </Link>
              </div>
              <div className='col s12 m6 center-align'>
                  <Link className="waves-effect red darken-4 btn-large" to={'/join-master'}>
                      <span>Join Master</span>
                  </Link>
          </div>
        </div>
          <div className="card z-depth-2">
              <div className="card-content grey darken-3">
                  <label className='red-text text-lighten-1 font14'>Character</label><span
                  className="card-title grey-text text-lighten-3">{character.name}</span>
                  <label className='red-text text-lighten-1 font14'>Class</label><p
                  className='grey-text text-lighten-3 font18'>{character.class}</p>
                  <label className='red-text text-lighten-1 font14'>Race</label><p
                  className='grey-text text-lighten-3 font18'>{character.race}</p>
                  <label className='red-text text-lighten-1 font14'>HP</label><p
                  className='grey-text text-lighten-3 font18'>{character.hp}</p>
                  <label className='red-text text-lighten-1 font14'>MaxHP</label><p
                  className='grey-text text-lighten-3 font18'>{character.maxHp}</p>
                  <label className='red-text text-lighten-1 font14'>Notes</label><p
                  className='grey-text text-lighten-3 font16'>{character.notes}</p>
              </div>
              <div className="card-action black">
                  <a className='red-text text-darken-4 font14' href="#">Delete</a>
                  <Link className='red-text text-darken-4 font14' to={'/create'}>
                      <span>Edit</span>
                  </Link>
              </div>
        </div>
      </div>
      )
  }else{
  return(
    <div className="container center">
      <p> Loading </p>
    </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const characters = state.firestore.data.characters;
  const character = characters ? characters[id] : null;
  return{
    character: character,
    auth: state.firebase.auth
  }
};
export default compose(
  firestoreConnect(['characters']),
  connect(mapStateToProps)
)(CharacterDetails);



