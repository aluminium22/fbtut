import React, {Component} from 'react';
import {createCharacter} from '../../store/actions/characterActions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import '../../style/custom.css'

class CreateCharacter extends Component {
  state = {
    name: '',
    class: '',
    race: '',
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
    // console.log(this.state);
    this.props.createCharacter(this.state);
  };

  render() {
    const { auth } = this.props.auth;
    if(auth){
      if(!auth.uid){
        return <Redirect to='/signin' />
      }
    }
    return (
      <div className="container">
        <form className=" grey darken-4" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-lighten-3">Create New Character</h5>
          <div className="input-field">
            <label htmlFor="name">Character Name</label>
            <input className="grey-text text-lighten-3" type="text" id="name" onChange={this.handleChange}></input>
          </div>
          <div className="input-field text-lighten-3">
            <label htmlFor="class">Class</label>
            <input className="grey-text text-lighten-3" type="text" id="class" onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="race">Race</label>
            <input className="grey-text text-lighten-3" type="text" id="race" onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="hp">HP</label>
            <input className="grey-text text-lighten-3" type="number" id="hp" onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="maxHp">maxHP</label>
            <input className="grey-text text-lighten-3" type="number" id="maxhp" onChange={this.handleChange}></input>
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
            <button className="btn red darken-1 z-depth-0">Create</button>
          </div>
        </form>

      </div>
    );
  }
}
const mapDispatchtoProps = (dispatch) => {
  return {
    createCharacter: (character) => dispatch(createCharacter(character))
  }
};
const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }};

export default connect(mapStateToProps, mapDispatchtoProps)(CreateCharacter);