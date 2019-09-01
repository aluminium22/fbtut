import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = (e) => {
    this.setState({[e.target.id]: e.target.value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state)
  };

  render() {

    const { auth } = this.props;
    if(auth.uid){
      return <Redirect to='/' />
    }
    return (
      <div className="container">
          <form className="grey darken-4" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
              <input className="grey-text text-lighten-3" type="email" id="email" onChange={this.handleChange}></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
              <input className="grey-text text-lighten-3" type="password" id="password"
                     onChange={this.handleChange}></input>
          </div>
          <div className='input-field'>
              <button className="btn red darken-2 z-depth-0">Login</button>
            <div className="red-text center">
              {this.props.authError ? <p>{this.props.authError}</p> : null}
            </div>
          </div>
        </form>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
};

const mapDispatchToProps = (dispatch) => {
  return{
    signIn: (credentials) => dispatch(signIn(credentials))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
