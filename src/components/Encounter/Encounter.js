import React, {Component} from 'react';
import EncounterCharacterList from "./EncounterCharacterList";
import connect from "react-redux/es/connect/connect";
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
import {updateTurn, setHasPlayed, clearTurn, updateEncounterChar} from "../../store/actions/encounterAction";

import firebase from '../../config/fbConfig'

class Encounter extends Component {
    state = {
        characters: []
    };

    sortCharacter(characters) {
        const array = characters.slice().sort((a, b) => (parseFloat(a.initiative) > parseFloat(b.initiative)) ? -1 : 1);
        return array;
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.encounter !== prevProps.encounter) {
            console.log('this. prop char', this.props.encounter.characters);
            this.setState({
                characters: this.props.encounter.characters
            })
        }
    }

    updateChar = (character) => {
        this.props.updateEncounterChar(this.props.encounter, character)
    };

    handleUpdateTurn = (encounter) => {
        let chara = null;
        for (let i = encounter.characters.length - 1; i >= 0; i--) {
            if (!encounter.characters[i].playedRound) {
                chara = encounter.characters[i];
            }
        }
        if (!chara) {
            encounter.characters.map(character => {
                this.props.setHasPlayed(character, encounter.id, false)
            });
            chara = encounter.characters[0];
        }
        this.props.updateTurn(encounter, chara, true);
    };

    clearTurn = (encounter) => {
        encounter.characters.map(character => {
            this.props.setHasPlayed(character, encounter.id, false)
        });
        this.props.clearTurn(encounter)
    };

    render() {
        let {encounter, auth} = this.props;
        if (encounter) {
            if (this.state.characters) {
                this.sortCharacter(this.state.characters);
                if (!auth.uid) {
                    return <Redirect to='/signin'/>
                }
                return (
                    <div className='dashboard container'>
                        <div className='row'>
                            <div className='col s12'>
                                <EncounterCharacterList auth={auth} updateChar={this.updateChar}
                                                        encounter={encounter.turn} characters={this.state.characters}/>
                            </div>
                        </div>
                        <a onClick={() => this.handleUpdateTurn(this.props.encounter)}
                           className="waves-effect red darken-4 waves-light btn">
                            {this.props.encounter.turn &&
                            <span>Next</span>
                            }
                            {!this.props.encounter.turn &&
                            <span>Start</span>
                            }
                        </a>
                        {this.props.encounter.turn &&
                        <a onClick={() => this.clearTurn(encounter)}
                           className="waves-effect red darken-4 waves-light btn">
                            <span>Clear</span>
                        </a>
                        }
                    </div>
                )
            } else {
                return (
                    <div className="container center">
                        {
                            window.location.reload()
                        }
                        <p> Loading </p>
                    </div>
                )
            }
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
        updateTurn: (encounter, character, value) => dispatch(updateTurn(encounter, character, value)),
        setHasPlayed: (character, encounterId, value) => dispatch(setHasPlayed(character, encounterId, value)),
        clearTurn: (encounter) => dispatch(clearTurn(encounter)),
        updateEncounterChar: (encounter, character) => dispatch(updateEncounterChar(encounter, character))

    }
};


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const encounters = state.firestore.ordered.encounters;
    const encounter = encounters ? encounters[0] : null;
    return {
        encounterId: id,
        encounter: encounter,
        auth: state.firebase.auth
    }
};
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect((props) => {
        if (!props.auth.uid) return [];
        return [{
            collection: 'encounters',
            doc: props.encounterId,
            subcollections: [
                {
                    collection: 'characters',
                    orderBy: ['initiative', 'desc',],
                }
            ]
        },
            {
                collection: 'encounters',
                doc: props.encounterId,
            }
        ]
        }
    ),
)(Encounter);


// limit: 1,
// orderBy: ['timestamp', 'desc',],
// storeAs: 'settings',