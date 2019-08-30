import React, {Component} from 'react';
import CharacterSummary from "../characters/CharacterSummary";
import {Link} from 'react-router-dom';
import {removeEncounterCharacter} from "../../store/actions/encounterAction";
import EncounterCharacter from "./EncounterCharacter";

const border = {
    border: "1px solid #00000059"
};

class EncounterCharacterList extends Component {

    render() {
        console.log('character in list', this.props);
        if (this.props.characters) {
            if (this.props.characters.length) {
                return (
                    <ul className="collection ul-border" style={border}>
                        {
                            this.props.characters && this.props.characters.map(character => {
                                return (
                                    <EncounterCharacter key={character.id} onPress={this.props.onPress}
                                                        detachMaster={this.props.detachMaster}
                                                        removeEncounter={this.props.removeEncounter}
                                                        character={character}
                                                        updateChar={this.props.updateChar}
                                                        auth={this.props.auth}
                                                        roll={this.props.roll}
                                                        encounter={this.props.encounter}/>
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

export default EncounterCharacterList;