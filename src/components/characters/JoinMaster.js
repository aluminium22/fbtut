import React, {Component} from 'react';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';

class JoinMaster extends Component {
    state = {
        email: '',
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

        const {auth} = this.props;
        if (auth.uid) {
            return <Redirect to='/'/>
        }
        return (
            <div className="container">
                <form className="white" onSubmit={this.handleSubmit}>
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange}></input>
                    </div>
                    <div className='input-field'>
                        <button className="btn red darken-4 z-depth-0">Join</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(JoinMaster);