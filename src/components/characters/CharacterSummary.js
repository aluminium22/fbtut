import React from 'react';
import {Link} from "react-router-dom";

const CharacterSummary = ({character}) => {
  return (
      <div className=' flex flex-space-between flex-align-items'>
          <Link className='flex flex-align-items' to={'/character/' + character.id}>
              {character.imageLink &&
              <img src={character.imageLink} alt="" className="circle-image"/>
              }
              {!character.imageLink &&
              <img src={require(`../characters/images/Tuun-avatar-flat.jpg`)} alt="" className="circle-image"/>
              }
              <div className="flex-col padding-left16 flex-justify-left">
                  <span className="title">
                      {character.name}
                  </span>
                  {character.class &&
                  <span className="text-grey text-lighten-2">
                          Class: {character.class}
                      </span>
                  }
                  {character.hp &&
                  <span>
                          HP: {character.hp}
                      </span>
                  }
              </div>
          </Link>
          <a href="#!"><i className="material-icons ">add</i></a>
      </div>
  )
};

export default CharacterSummary;