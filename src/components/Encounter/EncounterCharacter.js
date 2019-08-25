import React, {Component} from 'react';
import {Link} from "react-router-dom";

const border = {
    border: "1px solid #00000059"
};

class EncounterCharacter extends Component {
    constructor(props) {
        super(props);
        this.detachMaster = this.detachMaster.bind(this);
        this.removeEncounter = this.removeEncounter.bind(this);
    }

    renderStyle(value) {
        return ''
    }

    detachMaster() {
        this.props.detachMaster(this.props.character)
    }

    removeEncounter() {
        this.props.removeEncounter(this.props.character, this.props.character.encounterId)
    }

    render() {
        return (
            <div className={`scale-transition ${this.renderStyle(this.props.character)}`}>
                <div className={`flex flex-space-between flex-align-items`}>
                    <li className="collection-item z-depth-2 margin8 grey darken-3 width80 display-inline-block flex flex-space-between flex-align-items"
                        style={border}>
                        <div className={`flex flex-space-between flex-align-items`}>
                            <Link className='flex flex-align-items' to={'/character/' + this.props.character.id}>
                                {this.props.character.imageLink &&
                                <img src={this.props.character.imageLink} alt="" className="circle-image"/>
                                }
                                {!this.props.character.imageLink &&
                                <img src={require(`../characters/images/Tuun-avatar-flat.jpg`)} alt=""
                                     className="circle-image"/>
                                }
                                <div className="flex-col padding-left16 flex-justify-left">
                  <span className="title">
                      {this.props.character.name}
                  </span>
                                    {this.props.character.class &&
                                    <span className="text-grey text-lighten-2">
                          Class: {this.props.character.class}
                      </span>
                                    }
                                    {this.props.character.hp &&
                                    <span>
                          HP: {this.props.character.hp}
                      </span>
                                    }
                                </div>
                            </Link>
                            <div className='flex-col'>
                                <span className='display-inline-block'>Init:{this.props.character.initiative}</span>
                            </div>
                        </div>
                    </li>
                    <div className='display-inline-block roll-container width20'>
                        <span className={'font60'}>{this.props.character.currentRoll}</span>
                    </div>
                </div>
            </div>
        )
    }
}


export default EncounterCharacter;