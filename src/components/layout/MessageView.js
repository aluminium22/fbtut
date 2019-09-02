import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateMessage as authMessage} from "../../store/actions/authActions";
import {updateMessage as characterMessage} from "../../store/actions/characterActions";
import {updateMessage} from "../../store/actions/encounterAction";


class MessageView extends Component {

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.auth.message !== prevProps.auth.message) {
            setTimeout(() => this.props.authMessage(null), 4000)
        }
        if (this.props.characters.message !== prevProps.characters.message) {
            setTimeout(() => this.props.characterMessage(null), 4000)
        }
        if (this.props.encounter.message !== prevProps.encounter.message) {
            setTimeout(() => this.props.updateMessage(null), 4000)
        }
    }

    render() {
        const {auth, characters, encounter} = this.props;
        if (auth.message || characters.message || encounter.message) {
            return (
                <div className="z-depth-2 grey lighten-1">
                    <div className="container">
                        {auth.message &&
                        <div className="padding8 text-bold text-grey text-darken-3">{auth.message}</div>}
                        {characters.message &&
                        <div className="padding8 text-bold text-grey text-darken-3">{characters.message}</div>}
                        {encounter.message &&
                        <div className="padding8 text-bold text-grey text-darken-3">{encounter.message}</div>}
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        updateMessage: (message) => dispatch(updateMessage(message)),
        characterMessage: (message) => dispatch(characterMessage(message)),
        authMessage: (message) => dispatch(authMessage(message))

    }
};

const mapStateToProps = (state) => {
    console.log('log', state);
    return {
        characters: state.character,
        encounter: state.encounter,
        auth: state.auth,
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(MessageView);