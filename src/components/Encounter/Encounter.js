import React, {Component} from 'react';
import EncounterCharacterList from "./EncounterCharacterList";
import connect from "react-redux/es/connect/connect";
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
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

    render() {
        const {encounter, auth} = this.props;
        console.log('encounter', encounter);
        if (encounter && encounter.characters) {
            console.log('encounter', encounter.characters);
            const characters = encounter.characters;
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


const hasUser = (id) => {
    if (firebase.auth().currentUser) {
        console.log('id--- ', id);
        return ({collection: 'encounters', where: [['encounterId', '==', id]]})
    } else {
        return null;
    }

};
// const mapDispatchtoProps = (dispatch) => {
//     return {
//         updateEncounterCharacter: (character) => dispatch(updateEncounterCharacter(character)),
//         removeEncounterCharacter: (character) => dispatch(removeEncounterCharacter(character))
//     }
// };


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
    connect(mapStateToProps),
    firestoreConnect((props) => {
            return [`encounters/${props.encounterId}`]
        }
    )
)(Encounter);