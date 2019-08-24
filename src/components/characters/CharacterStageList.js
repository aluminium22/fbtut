import React, {Component} from 'react';
import CharacterStage from "./CharacterStage";

const border = {
    border: "1px solid #000000cc"
};

class CharacterStageList extends Component {
    render() {
        return (
            <ul className="collection grey darken-3" style={border}>
                {
                    this.props.characters && this.props.characters.map(character => {
                        return (
                            <li className="collection-item grey darken-3" style={border} key={character.id}>
                                <CharacterStage onPress={this.props.onPress} character={character}/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default CharacterStageList;