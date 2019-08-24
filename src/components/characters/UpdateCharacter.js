import React, {Component} from 'react';
import {updateCharacter} from '../../store/actions/characterActions';
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom';
import '../../style/custom.css'
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import firebase from '../../config/fbConfig'

class UpdateCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.characterId,
            name: '',
            class: '',
            race: '',
            imageLink: '',
            hp: 0,
            maxHp: 0,
            initiative: 0,
            notes: ''
        };
        // firebase.auth().onAuthStateChanged(() =>{
        //     this.setState({
        //         name: this.props.character.name,
        //         class: this.props.character.class,
        //         race: this.props.character.race,
        //         hp: this.props.character.hp,
        //         maxHp: this.props.character.maxHp,
        //         initiative: this.props.character.initiative,
        //         notes: this.props.character.notes
        //     })
        // });
    }

    isActive(value) {
        if (value) {
            return 'active';
        } else {
            return '';
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.character !== this.props.character) {
            this.setState({
                name: this.props.character.name,
                class: this.props.character.class,
                race: this.props.character.race,
                imageLink: this.props.character.imageLink,
                hp: this.props.character.hp,
                maxHp: this.props.character.maxHp,
                initiative: this.props.character.initiative,
                notes: this.props.character.notes
            })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.id]: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state);
        this.props.updateCharacter(this.state, this.props.history);
    };

    render() {
        console.log('history', this.props.history);
        const {auth} = this.props.auth;
        if (auth) {
            if (!auth.uid) {
                return <Redirect to='/signin'/>
            }
        }
        return (
            <div className="container padding8">
                <form className=" grey darken-4" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-lighten-3 padding8">Create New Character</h5>
                    <div className="input-field">
                        <label className={this.isActive(this.state.name)} htmlFor="name">Character Name</label>
                        <input className="grey-text text-lighten-3" value={this.state.name} type="text" id="name"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field text-lighten-3">
                        <label className={this.isActive(this.state.class)} htmlFor="class">Class</label>
                        <input className="grey-text text-lighten-3" value={this.state.class} type="text" id="class"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label className={this.isActive(this.state.race)} htmlFor="race">Race</label>
                        <input className="grey-text text-lighten-3" value={this.state.race} type="text" id="race"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label htmlFor="imageLink">Image Link</label>
                        <input className="grey-text text-lighten-3" type="text" id="imageLink"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label className={this.isActive(this.state.hp)} htmlFor="hp">HP</label>
                        <input className="grey-text text-lighten-3" value={this.state.hp} type="number" id="hp"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label className={this.isActive(this.state.maxHp)} htmlFor="maxHp">maxHP</label>
                        <input className="grey-text text-lighten-3" value={this.state.maxHp} type="number" id="maxHp"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label className={this.isActive(this.state.initiative)} htmlFor="initiative">Initiative</label>
                        <input className="grey-text text-lighten-3" value={this.state.initiative} type="number"
                               id="initiative" min="0" max="15"
                               onChange={this.handleChange}></input>
                    </div>
                    <div className="input-field">
                        <label className={this.isActive(this.state.notes)} htmlFor="notes">Notes</label>
                        <textarea id="notes" className="materialize-textarea grey-text text-lighten-3"
                                  value={this.state.notes}
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
        updateCharacter: (character, history) => dispatch(updateCharacter(character, history))
    }
};
const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const characters = state.firestore.data.characters;
    const character = characters ? characters[id] : null;
    return {
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
)(UpdateCharacter);