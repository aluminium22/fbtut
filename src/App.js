import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CharacterDetails from "./components/characters/CharacterDetails";
import Master from "./components/masters/Master"
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateCharacter from "./components/characters/CreateCharacter";
import Characters from "./components/characters/Characters";
import StageEncounter from "./components/Encounter/StageEncounter";
import Dice from "./components/dice/Dice";
import UpdateCharacter from "./components/characters/UpdateCharacter";
import Encounter from "./components/Encounter/Encounter";
import firebase from "firebase";
import {connect} from "react-redux";
import {reAuth} from "./store/actions/authActions";


class App extends Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      console.log('auth garbage', this.props);
      this.props.reAuth(this.props.auth.uid)
    })
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/character/:id' component={CharacterDetails}/>
            <Route path='/encounter/:id' component={Encounter}/>
            <Route path='/characters' component={Characters}/>
            <Route path='/master' component={Master}/>
              <Route path='/stage-encounter' component={StageEncounter}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/create' component={CreateCharacter}/>
            <Route path='/update/:id' component={UpdateCharacter}/>
            <Route path='/dice' component={Dice}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    reAuth: (auth) => dispatch(reAuth(auth)),

  }
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
};
export default connect(mapStateToProps, mapDispatchtoProps)(App);

