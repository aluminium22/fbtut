import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CharacterSummary extends Component {
    constructor(props) {
        super(props);
        this.addEncounterCharacter = this.addEncounterCharacter.bind(this);
        this.removeEncounterCharacter = this.removeEncounterCharacter.bind(this);
    }

    addEncounterCharacter() {
        this.props.onPress(this.props.character, 'add')
    }

    removeEncounterCharacter() {
        this.props.onPress(this.props.character, 'remove')
    }

    render() {
        return (
            <div className=' flex flex-space-between flex-align-items'>
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
                {!this.props.character.encounterId &&
                <a onClick={this.addEncounterCharacter}><i className="material-icons ">add</i></a>
                }
                {this.props.character.encounterId &&
                <a onClick={this.removeEncounterCharacter}><i className="material-icons ">remove</i></a>
                }
            </div>
        )
    }
}

export default CharacterSummary;