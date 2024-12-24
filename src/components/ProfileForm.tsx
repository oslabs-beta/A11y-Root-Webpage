import { useState, useEffect } from 'react';
import { ProfileFormProps, Project } from '../types';
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';

const DOMAIN_NAME = process.env.DOMAIN_NAME || 'https://localhost:3333';

function ProfileForm({
  userInfo,
  selectedProject,
  setSelectedProject,
}: ProfileFormProps) {
  const [projects, setProjects] = useState<Project[] | null>([]);

  useEffect(() => {
    const getUserProjects = async () => {
      try {
        const response = await fetch(
          `${DOMAIN_NAME}/users/findAll/${userInfo.githubId}`
        );
        if (response.ok) {
          const userDetails = await response.json();

          const projectArr = userDetails.projects;

          setProjects(projectArr as Project[]);
        }
      } catch (error) {
        console.error('Could not get user details: ', error);
      }
    };
    getUserProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(
          `${DOMAIN_NAME}/users/${userInfo.githubId}`,
          {
            method: 'DELETE',
          }
        );
        if (response.ok) {
          alert('User deleted successfully');
          setProjects([]);
        }
      } catch (error) {
        console.error('Could not delete user: ', error);
      }
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${DOMAIN_NAME}projects/${projectId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          alert('Project deleted successfully');
          setProjects((prevProjects) =>
            prevProjects
              ? prevProjects.filter((project) => project._id !== projectId)
              : []
          );
          setSelectedProject(null);
        }
      } catch (error) {
        console.error('Could not delete project: ', error);
      }
    }
  };

  return (
    <div>
      <Button id='delete-user-button' onPress={handleDeleteUser}>
        Delete User
      </Button>
      <h2>View Your Projects</h2>
      {projects && projects.length > 0 ? (
        <div id='profile-form'>
          <MenuTrigger>
            <Button id='profile-form-button' aria-label='Menu'>
              {selectedProject
                ? selectedProject.projectName
                : '-- Select a Project --'}
            </Button>
            <Popover>
              <Menu id='menu-profile'>
                {projects.map((project) => (
                  <MenuItem
                    key={project._id}
                    className='menu-item'
                    onAction={() => setSelectedProject(project)}
                  >
                    {project.projectName}
                  </MenuItem>
                ))}
              </Menu>
            </Popover>
          </MenuTrigger>

          {selectedProject && (
            <div id='delete-section'>
              <h2>Selected Project: {selectedProject.projectName}</h2>
              <Button
                id='delete-project-button'
                onPress={() => handleDeleteProject(selectedProject._id)}
              >
                Delete Selected Project
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
export default ProfileForm;
