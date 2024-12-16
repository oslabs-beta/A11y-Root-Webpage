import { useState } from 'react';
import ProfileForm from '../components/ProjectForm';
import { ProfileContainerProps, Project } from '../types';

function ProfileContainer({ userInfo }: ProfileContainerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // project state
  // update project state handler -> passed to projectform
  // from project state fetch data from user
  // pass pages setPageResults to PageForm so that it can update pageResults

  return (
    <div>
      <ProfileForm
        userInfo={userInfo}
        setSelectedProject={setSelectedProject}
        selectedProject={selectedProject}
      />
    </div>
  );
}

export default ProfileContainer;
