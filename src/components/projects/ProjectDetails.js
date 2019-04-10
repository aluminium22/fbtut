import React from 'react';

const ProjectDetails = (props) => {
  const id = props.match.params.id
  return (
    <div className="container section project-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Project Title - {id}</span>
          <p>words and text things to type in here.</p>
        </div>
      </div>
      <div className="card-action grey lighten-4 grey text">
        <div>Posted by me</div>
        <div>2nd of September 2am</div>
      </div>
    </div>
  );
};

export default ProjectDetails;



