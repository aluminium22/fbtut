import React from 'react';
import { Link} from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import {connect} from 'react-redux';

const Navbar = (props) => {
  const {auth} = props;
  const links = props.uid ? <SignedInLinks/> : <SignedOutLinks/>;
  return (
    <nav className="nav-wrapper grey darken-3" >
      <div className="container">
        <Link to='/' className="logo"><img src={require(`../../images/Tuun-avatar-flat.jpg`)} alt=""
                                           className="logo-image"/></Link>
        { links }
      </div>
    </nav>
  )
};

const mapStateToProps = (state) => {
  console.log('log', state);
  return {
    auth: state.firebase.auth,
    uid: state.auth.uid
  }
};

export default connect(mapStateToProps)(Navbar);