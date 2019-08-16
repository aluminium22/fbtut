import React from 'react';
import {Link} from "react-router-dom";

const CharacterSummary = ({character}) => {
  return (
      <div>
          <Link to={'/character/' + character.id}>
              <img src="https://materializecss.com/images/yuna.jpg" alt="" className="circle"/>
              <span className="title">Title</span>
              <p>First Line <br></br>
                  Second Line
              </p>
          </Link>
          <a href="#!" className="secondary-content"><i className="material-icons">add</i></a>
      </div>
  )
}

export default CharacterSummary;