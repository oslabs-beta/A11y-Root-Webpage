import { useState, useEffect } from 'react';
import { ProfileFormProps, Project } from '../types';

function ProfileForm({ userInfo }: ProfileFormProps) {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const getUserProjects = async () => {
      try {
        const response = await fetch(
          `https://localhost:3333/users/findAll/${userInfo.githubId}`
        );
        if (response.ok) {
          const userDetails = await response.json();

          const projectArr = userDetails.projects;
          //get DBprojects' pages into JSON format (stored as strings in DB, but client expects them to be in object form)
          //   projectArr.forEach((project: DBProject) => {
          //     project.pages.forEach((page) => {
          //       page.tree = JSON.parse(page.tree);
          //       page.skipLink = JSON.parse(page.skipLink);
          //       page.h1 = JSON.parse(page.h1);
          //       page.tabIndex = page.tabIndex.map((node: string) => {
          //         return JSON.parse(node);
          //       });
          //     });
          //   });

          setProjects(projectArr as Project[]);
        }
      } catch (error) {
        console.error('Could not get user details: ', error);
      }
    };
    getUserProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {projects.length > 0 ? (
        <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <h2>{project.projectName}</h2>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
export default ProfileForm;
