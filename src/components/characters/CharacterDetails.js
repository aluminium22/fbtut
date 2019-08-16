import React from 'react';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom';

const CharacterDetails = (props) => {
  const { auth, character } = props;
  if(!auth.uid){
    return <Redirect to='/signin' />
  }  if(character){
    return(
      <div className="container section character-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{character.title}</span>
            <p>{character.content}</p>
          </div>
        </div>
        <div className="card-action grey lighten-4 grey text">
          <div>Posted by {character.authorFirstName} {character.authorLastName}</div>
          <div>2nd of September 2am</div>
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
  }}
export default compose(
  firestoreConnect(['characters']),
  connect(mapStateToProps)
)(CharacterDetails);



