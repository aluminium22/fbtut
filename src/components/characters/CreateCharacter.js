import React, {Component} from 'react';
import {createCharacter} from '../../store/actions/characterActions';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

class CreateCharacter extends Component {
  state = {
    title: '',
    content: '',
  };

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createCharacter(this.state);
  }

  render() {
    const { auth } = this.props.auth;
    if(auth){
      if(!auth.uid){
        return <Redirect to='/signin' />
      }
    }
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Create New Character</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="content">character Content</label>
            <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
          </div>
          <div className='input-field'>
            <button className="btn pink lighten-1 z-depth-0">Create</button>
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
}
const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }};

export default connect(mapStateToProps, mapDispatchtoProps)(CreateCharacter);