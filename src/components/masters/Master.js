import React from 'react';
import {Link} from "react-router-dom";

const Master = () => {
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
};

export default Master;
