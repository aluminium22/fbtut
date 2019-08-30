import React, {Component} from 'react';
import CharacterSummary from "./CharacterSummary";
import { Link } from 'react-router-dom';
import {removeEncounterCharacter} from "../../store/actions/encounterAction";

const border = {
    border: "1px solid #00000059"
};

class CharacterList extends Component {
    render() {
        if (this.props.characters) {
            if (this.props.characters.length) {
                return (
                    <ul className="collection ul-border" style={border}>
                        {
                            this.props.characters && this.props.characters.map(character => {
                                return (
                                    <li className="collection-item z-depth-2 margin8 grey darken-3" style={border}
                                        key={character.id}>
                                        <CharacterSummary onPress={this.props.onPress}
                                                          detachMaster={this.props.detachMaster}
                                                          removeEncounter={this.props.removeEncounter}
                                                          updateEncounter={this.props.updateEncounter}
                                                          character={character}/>
                                    </li>
                                )
                            })
                        }
                    </ul>
                )
            } else {
                return (
                    <div className="container">
                        <h5 className='grey-text text-darken-1'>Create a New Character</h5>
                    </div>
                );
            }
        } else {
            return null;
        }
    }
}

export default CharacterList;