import React, {Component} from 'react';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {joinMaster, deleteCharacter} from '../../store/actions/characterActions';
import connect from "react-redux/es/connect/connect";
import {Link, Redirect} from 'react-router-dom';
import firebase from '../../config/fbConfig'

class CharacterDetails extends Component {

    state = {
        masterEmail: '',
    };
    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    };

    handleDelete = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.deleteCharacter(this.props.character, this.props.characterId, this.props.history);
    };
    handleMasterJoin = (e) => {
        e.preventDefault();
        this.props.joinMaster(this.state.masterEmail, this.props.characterId, this.props.character)
    };

    render() {
        const {auth, character, characterId} = this.props;
        if (character) {
            if (!auth.uid) {
                return <Redirect to='/signin'/>
            }
            return (
                <div className="container section character-details">
                    <div className='row'>
                        <div className='col s12 m6 center-align'>
                            <Link className="waves-effect red darken-4 btn-large" to={'/create'}>
                                <span>Encounter</span>
                            </Link>
                        </div>
                        <div className='col s12 m6 center-align'>
                            {character.masterId === character.userId &&
                            <div className="input-field">
                                <label htmlFor="initiative">Assign Master (GM Email)</label>
                                <input className={`grey-text text-lighten-3 scale-transition`}
                                       value={this.state.masterEmail} type="text" id="masterEmail"
                                       onChange={this.handleChange}/>
                                <a onClick={this.handleMasterJoin} className="waves-effect red darken-4 btn-small">
                                    <span>Submit</span>
                                </a>
                            </div>
                            }
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
                            <a className='red-text text-darken-4 font14' onClick={this.handleDelete}>Delete</a>
                            <Link className='red-text text-darken-4 font14' to={`/update/${characterId}`}>
                                <span>Edit</span>
                            </Link>
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
        deleteCharacter: (character, id, history) => dispatch(deleteCharacter(character, id, history)),
        joinMaster: (email, characterId, character) => dispatch(joinMaster(email, characterId, character))

    }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const characters = state.firestore.data.characters;
    let character = characters ? characters[id] : null;
  return{
      characterId: id,
    character: character,
    auth: state.firebase.auth
  }
};
export default compose(
    firestoreConnect((props) => {
        return [{collection: 'characters', where: [['userId', '==', firebase.auth().currentUser.uid]]}]
        }
    ),
    connect(mapStateToProps, mapDispatchtoProps)
)(CharacterDetails);



