import * as React from 'react';
import { useState, useEffect } from 'react';

interface Project {
	_id: string
	userGithubId: string
  	projectName: string
  	pages: any[]
}
//pass in user info from form container and use github id in fetch
export default function ProjectForm({userInfo}) {
	const [projects, setProjects] = useState<Project[]>([]);
	const [selectedProject, setSelectedProject] = useState<string>('');
	

	const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedProject(event.target.value);
	};

	useEffect(() => {
    const getUserDetails = async () => {
			try {
				const response = await fetch('https://localhost:3333/users/findAll/abc123')
				if (response.ok) {
					const userDetails = await response.json();
					console.log(userDetails);
					console.log("********", userDetails.projects);
					setProjects(userDetails.projects);
					// setPages(userDetails.projects.pages);
				}
			} catch (error) {
				console.error('Could not get user details: ', error);
			}
		}
    getUserDetails();
  }, []);

	
	return (
		<form id='project-form'>
			<label>Select a project:</label>
			<select value={selectedProject} onChange={handleSelectChange}>
			{/* <option value="" disabled>
          -- Select a Project --
        </option> */}
        {projects.map((project) => (
          <option key={project._id} value={project._id}>
            {project.projectName}
          </option>
        ))}
			</select>	
		</form>
	)
}