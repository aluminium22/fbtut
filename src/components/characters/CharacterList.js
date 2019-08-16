import React from 'react';
import CharacterSummary from "./CharacterSummary";
import { Link } from 'react-router-dom';

const border = {
    border: "1px solid #000000cc"
};

const CharacterList = ({characters}) => {
  return (
      <ul className="collection grey darken-3"  style={border}>
        {
          characters && characters.map(character =>{
            return (
                <li className="collection-item avatar grey darken-3" style={border} key={character.id}>
                    <CharacterSummary character={character}/>
                </li>
            )
          })
        }
      </ul>
  )
}

export default CharacterList;