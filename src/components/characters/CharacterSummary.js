import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CharacterSummary extends Component {
    constructor(props) {
        super(props);
        this.detachMaster = this.detachMaster.bind(this);
        this.removeEncounter = this.removeEncounter.bind(this);
    }

    renderStripes(value) {
        return value ? 'stripe-background' : ''
    }

    detachMaster() {
        this.props.detachMaster(this.props.character)
    }

    removeEncounter() {
        this.props.removeEncounter(this.props.character, this.props.character.encounterId)
    }

    render() {
        return (
            <div
                className={`flex flex-space-between flex-align-items ${this.renderStripes(!(this.props.character.masterId === this.props.character.userId))}`}>
                <Link className='flex flex-align-items' to={'/character/' + this.props.character.id}>
                    {this.props.character.imageLink &&
                    <img src={this.props.character.imageLink} alt="" className="circle-image"/>
                    }
                    {!this.props.character.imageLink &&
                    <img src={require(`../characters/images/Tuun-avatar-flat.jpg`)} alt="" className="circle-image"/>
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
                {!(this.props.character.masterId === this.props.character.userId) &&
                <div className='flex-col'>
                    {this.props.character.encounterId &&
                    <Link className={`waves-effect waves-red btn-flat display-block text-button-red`}
                          to={'/master'}>View</Link>
                    }
                    {this.props.character.encounterId &&
                    <a className={`waves-effect waves-red btn-flat text-button-grey display-block`}
                       onClick={this.removeEncounter}>Leave</a>
                    }
                    {!this.props.character.encounterId &&
                    <a className={`waves-effect waves-red btn-flat text-button-grey display-block`}
                       onClick={this.detachMaster}>Rescind</a>
                    }
                </div>
                }
            </div>
        )
    }
}


export default CharacterSummary;