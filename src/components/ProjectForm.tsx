import * as React from 'react';
import { useState, useEffect } from 'react';
import { ProjectFormProps, Project } from '../types';

//pass in user info from form container and use github id in fetch
export default function ProjectForm({ userInfo, setSelectedProject }: ProjectFormProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    
    const chosenProject = projects.find((project)=> project._id === event.target.value)
    setSelectedProject(chosenProject || null);
    console.log('selected project: ', chosenProject);
  };

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:3333/users/findAll/${userInfo.githubId}`
        );
        console.log(response);
        if (response.ok) {
          const userDetails = await response.json();
          console.log(userDetails);
          console.log('********', userDetails.projects);

          //get project pages sensicle

          setProjects(userDetails.projects);
        }
      } catch (error) {
        console.error('Could not get user details: ', error);
      }
    };
    getUserDetails();
  }, []);

  return (
    <form id='project-form'>
      <label>Select a project:</label>
      <select onChange={handleSelectChange}>
        { <option value="" selected disabled hidden>
          -- Select a Project --
        </option> }
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.projectName}
          </option>
        ))}
      </select>
    </form>
  );
}
