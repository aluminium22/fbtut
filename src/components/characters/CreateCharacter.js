import React, {Component} from 'react';
import {createCharacter} from '../../store/actions/characterActions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../../style/custom.css'

class CreateCharacter extends Component {
  state = {
    encounterId: '',
    name: '',
    class: '',
    race: '',
    imageLink: '',
    hp: 0,
    maxHp: 0,
    initiative: 0,
    notes: ''
  };


  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('state to submit ', this.state);
    // console.log(this.state);
      this.props.createCharacter(this.state, this.props.history);
  };

  render() {
    const {uid} = this.props;
    if (!uid) {
        return <Redirect to='/signin' />
      }
    return (
      <div className="container">
        <form className=" grey darken-4" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-lighten-3">Create New Character</h5>
          <div className="input-field">
            <label htmlFor="name">Character Name</label>
            <input className="grey-text text-lighten-3" type="text" id="name" required
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field text-lighten-3">
            <label htmlFor="class">Class</label>
            <input className="grey-text text-lighten-3" type="text" id="class" required
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="race">Race</label>
            <input className="grey-text text-lighten-3" type="text" id="race" required
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="imageLink">Image Link</label>
            <input className="grey-text text-lighten-3" type="text" id="imageLink" onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="hp">HP</label>
            <input className="grey-text text-lighten-3" type="number" id="hp" required
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="maxHp">maxHP</label>
            <input className="grey-text text-lighten-3" type="number" id="maxHp" required
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" className="materialize-textarea grey-text text-lighten-3"
                      onChange={this.handleChange}></textarea>
          </div>
          <div className='input-field'>
            <button className="btn red darken-1 z-depth-0">Create</button>
          </div>
        </form>

      </div>
    );
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
      createCharacter: (character, history) => dispatch(createCharacter(character, history))
  }
};
const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth,
    uid: state.auth.uid
  }};

export default connect(mapStateToProps, mapDispatchtoProps)(CreateCharacter);