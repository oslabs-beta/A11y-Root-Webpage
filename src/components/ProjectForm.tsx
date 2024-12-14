import { useState, useEffect } from 'react';
import { ProjectFormProps, Project, DBProject } from '../types';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';

//pass in user info from form container and use github id in fetch
export default function ProjectForm({
  userInfo,
  selectedProject,
  setSelectedProject,
}: ProjectFormProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  const handleSelectChange = (projectId: string) => {
    const chosenProject = projects.find(
      (project) => project._id === projectId
    );
    setSelectedProject(chosenProject || null);
  };

  useEffect(() => {
    const getUserDetails = async () => {
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
              page.tabIndex = page.tabIndex.map((node: string) => {
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
    getUserDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return(<div id='project-form'>
    <MenuTrigger>
      <Button id='project-form-button' aria-label='Menu'>
      {selectedProject ? (selectedProject.projectName):('-- Select a Project --')}
      </Button>
      <Popover>
        <Menu id='menu-project'>
        {projects.map((project) => (
          <MenuItem className='menu-item' onAction={()=>handleSelectChange(project._id)}>
            {project.projectName}
          </MenuItem>))}
        </Menu>
      </Popover>
    </MenuTrigger>

  </div>);
}
