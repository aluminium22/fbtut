import React from 'react';
import {Link} from "react-router-dom";

const CharacterSummary = ({character}) => {
  return (
      <div className='valign-wrapper flex flex-space-between'>
          <Link className='flex' to={'/character/' + character.id}>
              <img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle"/>
              <span className="title">Title</span>
              <p>First Line <br></br>
                  Second Line
              </p>
          </Link>
          <a href="#!"><i className="material-icons">add</i></a>
      </div>
  )
};

export default CharacterSummary;