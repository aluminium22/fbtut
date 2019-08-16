import React from 'react';
import CharacterSummary from "./CharacterSummary";
import { Link } from 'react-router-dom';

const CharacterList = ({characters}) => {
  return (
    <div className='character-list section'>
      <div className='character-list section'>
        {
          characters && characters.map(character =>{
            return (
              <Link to={'/character/' + character.id} key={character.id}>
                <CharacterSummary character={character}/>
              </Link>
            )
          })
        }
      </div>

    </div>
  )
}

export default CharacterList;