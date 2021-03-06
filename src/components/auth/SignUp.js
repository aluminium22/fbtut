import React, {Component} from 'react';
import { connect } from 'react-redux';
import {signUp} from'../../store/actions/authActions';
import {Redirect} from 'react-router-dom';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  };

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
    console.log(this.state);
  };

  render() {

    const { auth } = this.props;
    if(auth.uid){
      return <Redirect to='/' />
    }
    return (
      <div className="container">
        <form className="grey darken-4" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input className="grey-text text-lighten-3" required type="email" id="email"
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input className="grey-text text-lighten-3" required type="password" id="password"
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input className="grey-text text-lighten-3" required type="text" id="firstName"
                   onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input className="grey-text text-lighten-3" required type="text" id="lastName"
                   onChange={this.handleChange}></input>
          </div>
          <div className='input-field'>
            <button className="btn red darken-2 z-depth-0">Sign up</button>
          </div>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.firebase.auth
  }
};
const mapDispatchToProps = (dispatch) => {
  return{
    signUp: (newUser) => dispatch(signUp(newUser))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);