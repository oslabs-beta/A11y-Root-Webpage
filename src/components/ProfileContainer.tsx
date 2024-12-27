import { useState } from 'react';
import ProfileForm from '../components/ProfileForm';
import { ProfileContainerProps, Project } from '../types';

function ProfileContainer({ userInfo }: ProfileContainerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div>
      <ProfileForm
        userInfo={userInfo}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
      />
    </div>
  );
}

export default ProfileContainer;
