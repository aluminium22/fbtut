import React from 'react';
import ProjectSummary from "./ProjectSummary";

const ProjectList = ({projects}) => {
  console.log(projects)
  return (
    <div className='project-list section'>
      <div className='project-list section'>
        {
          projects && projects.map(project =>{
            return (
              <ProjectSummary project={project} key={project.id}/>
            )
          })
        }
      </div>

    </div>
  )
}

export default ProjectList;