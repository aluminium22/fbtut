import React, {Component} from 'react';
import {Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Master extends Component {
    render() {
        const {uid} = this.props;
        if (!uid) {
            return <Redirect to='/signin'/>
        }
        return (
            <div className='card z-depth-0 character-summary'>
                <span className='page-header'>Add To Your Encounter</span>
                <div className='row'>
                    <div className='col s12 m12 l6 center-align'>
                        <div>
                            <ul>
                                <Link className="waves-effect red darken-4 btn-large" to={'/stage-encounter'}>
                                    <span> Add to Encounter</span>
                                </Link>
                            </ul>
                            {/*<ul>*/}
                            {/*    <Link className="waves-effect red darken-4 btn-large hide-on-large-only" to={'/#'}>*/}
                            {/*        <span>Settings</span>*/}
                            {/*    </Link>*/}
                            {/*</ul>*/}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.auth.uid
    }
};

export default connect(mapStateToProps)(Master);
