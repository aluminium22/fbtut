import React from 'react';

const CharacterSummary = ({character}) => {
  return (
    <div className='card z-depth-0 character-summary'>
      <div className='card-content grey-text text-darken-3'>
        <span className='card-title'>{character.title}</span>
        <p>Posted by me</p>
        <p className='grey-text'> date date123213 </p>
      </div>
    </div>
  )
}

export default CharacterSummary;