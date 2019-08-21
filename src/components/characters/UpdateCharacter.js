import React, {Component} from 'react';
import {updateCharacter} from '../../store/actions/characterActions';
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom';
import '../../style/custom.css'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

class UpdateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.characterId,
            name: props.character.name,
            class: props.character.class,
            race: props.character.race,
            hp: props.character.hp,
            maxHp: props.character.maxHp,
            initiative: props.character.initiative,
            notes: props.character.notes
        };
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.updateCharacter(this.state);
    };

    render() {
        const {auth} = this.props.auth;
        if (auth) {
            if (!auth.uid) {
                return <Redirect to='/signin'/>
            }
        }
        return (
            <div className="container">
                <form className=" grey darken-4" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-lighten-3">Create New Character</h5>
                    <div className="input-field">
                        <label htmlFor="name">Character Name</label>
                        <input className="grey-text text-lighten-3" value={this.state.name} type="text" id="name"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field text-lighten-3">
                        <label htmlFor="class">Class</label>
                        <input className="grey-text text-lighten-3" type="text" id="class"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="race">Race</label>
                        <input className="grey-text text-lighten-3" type="text" id="race"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="hp">HP</label>
                        <input className="grey-text text-lighten-3" type="number" id="hp"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="maxHp">maxHP</label>
                        <input className="grey-text text-lighten-3" type="number" id="maxhp"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="initiative">Initiative</label>
                        <input className="grey-text text-lighten-3" type="number" id="initiative" min="0" max="15"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="notes">Notes</label>
                        <textarea id="notes" className="materialize-textarea grey-text text-lighten-3"
                                  onChange={this.handleChange}></textarea>
                    </div>
                    <div className='input-field'>
                        <button className="btn red darken-1 z-depth-0">Update</button>
                    </div>
                </form>

            </div>
        );
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        updateCharacter: (character) => dispatch(updateCharacter(character))
    }
};
const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const characters = state.firestore.data.characters;
    const character = characters ? characters[id] : null;
    console.log(character, id);
    return {
        characterId: id,
        character: character,
        auth: state.firebase.auth
    }
};

export default compose(
    firestoreConnect(['characters']),
    connect(mapStateToProps, mapDispatchtoProps)
)(UpdateCharacter);