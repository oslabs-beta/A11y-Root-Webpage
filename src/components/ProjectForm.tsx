import * as React from 'react';
import { useState, useEffect } from 'react';
import { ProjectFormProps, Project, DBProject } from '../types';

//pass in user info from form container and use github id in fetch
<<<<<<< HEAD
export default function ProjectForm({ setPageResults }) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [selectedProject, setSelectedProject] = useState<string>('');
	
=======
export default function ProjectForm({
  userInfo,
  setSelectedProject,
}: ProjectFormProps) {
  const [projects, setProjects] = useState<Project[]>([]);
>>>>>>> 4c9f19e3eb98b5592a1dbb8330f13dea05edb16e

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenProject = projects.find(
      (project) => project._id === event.target.value
    );
    setSelectedProject(chosenProject || null);
    console.log('selected project: ', chosenProject);
  };

  useEffect(() => {
    const getUserDetails = async () => {
<<<<<<< HEAD
			try {
				const response = await fetch('https://localhost:3333/users/findAll/abc123')
				if (response.ok) {
					const userDetails = await response.json();
					console.log(userDetails);
					console.log("********", userDetails.projects);
					setProjects(userDetails.projects);
					setPageResults();
					// setPages(userDetails.projects.pages);
				}
			} catch (error) {
				console.error('Could not get user details: ', error);
			}
		}
=======
      try {
        const response = await fetch(
          `https://localhost:3333/users/findAll/${userInfo.githubId}`
        );
        if (response.ok) {
          const userDetails = await response.json();

          const projectArr = userDetails.projects;
          //get DBprojects' pages into JSON format (stored as strings in DB, but client expects them to be in object form)
          projectArr.forEach((project: DBProject) => {
            project.pages.forEach((page) => {
              page.tree = JSON.parse(page.tree);
              page.skipLink = JSON.parse(page.skipLink);
              page.h1 = JSON.parse(page.h1);
              page.tabIndex = page.tabIndex.map((node:string) => {
                return JSON.parse(node);
              });
            });
          });

          setProjects(projectArr as Project[]);
        }
      } catch (error) {
        console.error('Could not get user details: ', error);
      }
    };
>>>>>>> 4c9f19e3eb98b5592a1dbb8330f13dea05edb16e
    getUserDetails();
  }, []);

  return (
    <form id='project-form'>
      <label>Select a project:</label>
      <select onChange={handleSelectChange}>
        {
          <option value='' selected disabled hidden>
            -- Select a Project --
          </option>
        }
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.projectName}
          </option>
        ))}
      </select>
    </form>
  );
}
