import React, {Component} from 'react';
import CharacterStage from "./CharacterStage";

const border = {
    border: "1px solid #00000059"
};

class CharacterStageList extends Component {
    render() {
        return (
            <ul className="collection ul-border" style={border}>
                {
                    this.props.characters && this.props.characters.map(character => {
                        return (
                            <li className="collection-item  z-depth-2 margin8 grey darken-3" style={border}
                                key={character.id}>
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