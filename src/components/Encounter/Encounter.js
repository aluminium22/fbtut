import React, {Component} from 'react';
import EncounterCharacterList from "./EncounterCharacterList";
import connect from "react-redux/es/connect/connect";
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {Link, Redirect} from 'react-router-dom';
import {
    updateTurn,
    setHasPlayed,
    clearTurn,
    updateEncounterChar,
    updateRoll,
    updateInit
} from "../../store/actions/encounterAction";
import Dice from '../dice/Dice';

import firebase from '../../config/fbConfig'

class Encounter extends Component {
    state = {
        isRoll: false,
        characters: null,
        rollCharacter: null,
    };

    sortCharacter(characters) {
        const array = characters.slice().sort((a, b) => (parseFloat(a.initiative) > parseFloat(b.initiative)) ? -1 : 1);
        return array;
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.encounter !== prevProps.encounter) {
            if (this.props.encounter.characters !== undefined) {
                console.log('this. prop char', this.props.encounter.characters);
                this.setState({
                    characters: this.sortCharacter(this.props.encounter.characters)
                })
            } else {
                window.location.reload()
            }
        }
    }

    updateChar = (character) => {
        this.props.updateEncounterChar(this.props.encounter, character)
    };

    handleUpdateTurn = (encounter) => {
        // this.setState({
        //     characters: this.sortCharacter(this.state.characters)
        // })
        console.log('characters- state ', this.state.characters);
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
    toggleDiceScreen = () => {
        console.log('roll');
        this.setState({
            isRoll: !this.state.isRoll
        })
    };

    roll = (character) => {
        this.toggleDiceScreen();
        this.setState({
            rollCharacter: character
        })
    };

    shareRoll = (roll) => {
        this.props.updateRoll(roll, this.state.rollCharacter);
        this.toggleDiceScreen()
    };
    shareInit = (roll) => {
        this.props.updateInit(roll, this.state.rollCharacter);
        this.toggleDiceScreen()
    };

    handleConditionToggle = (character, value) => {
        if (character.conditions) {
            let newCharacter = {...character};
            newCharacter.conditions = {...newCharacter.conditions, [value]: !newCharacter.conditions[value]};
            console.log('chaaracter  dd', newCharacter);
            this.props.updateEncounterChar(this.props.encounter, newCharacter);
        } else {
            let newCharacter = {...character};
            newCharacter.conditions = {[value]: true};
            console.log('new character condition', newCharacter);
            this.props.updateEncounterChar(this.props.encounter, newCharacter);
        }
    };


    render() {
        let {encounter, auth, uid} = this.props;
        if (!uid) {
            return <Redirect to='/signin'/>
        }
        if (encounter) {
            if (this.state.characters) {
                if (!auth.uid) {
                    return <Redirect to='/signin'/>
                }
                return (
                    <div className='dashboard container'>
                        <div className='row'>
                            <div className='col s12'>
                                <EncounterCharacterList auth={auth}
                                                        updateChar={this.updateChar}
                                                        roll={this.roll}
                                                        encounter={encounter.turn}
                                                        characters={this.state.characters}
                                                        condition={this.handleConditionToggle}
                                />
                            </div>
                        </div>
                        {auth.uid === encounter.characters[0].masterId &&
                        <div className="padding8">
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
                        }
                        {this.state.isRoll &&
                        <div className={'cancel-roll'}>
                            <a onClick={this.toggleDiceScreen}
                               className="btn-floating btn-small waves-effect waves-light red"><i
                                className="material-icons">close</i></a>
                        </div>
                        }
                        {this.state.isRoll &&
                        <Dice className={'overlay'} shareInit={this.shareInit} shareRoll={this.shareRoll}/>
                        }
                    </div>
                )
            } else {
                return (
                    <div className="container center">
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
        updateEncounterChar: (encounter, character) => dispatch(updateEncounterChar(encounter, character)),
        updateRoll: (roll, character) => dispatch(updateRoll(roll, character)),
        updateInit: (roll, character) => dispatch(updateInit(roll, character))

    }
};


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const encounters = state.firestore.ordered.encounters;
    const encounter = encounters ? encounters[0] : state.encounter;
    return {
        encounterId: id,
        encounter: encounter,
        auth: state.firebase.auth,
        uid: state.auth.uid
    }
};
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect((props) => {
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