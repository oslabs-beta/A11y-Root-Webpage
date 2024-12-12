import { useState } from 'react';
import PageForm from '../components/PageForm';
import ProjectForm from '../components/ProjectForm';
import { FormContainerProps, Project } from '../types';

function FormContainer({
  pageResults,
  setPageResults,
  userInfo,
}: FormContainerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // project state
  // update project state handler -> passed to projectform
  // from project state fetch data from user
  // pass pages setPageResults to PageForm so that it can update pageResults

  return (
    <>
      <ProjectForm
        userInfo={userInfo}
        setSelectedProject={setSelectedProject}
        selectedProject={selectedProject}
      />
      {selectedProject && (
        <PageForm
          setPageResults={setPageResults}
          selectedProject={selectedProject}
          pageResults={pageResults}
        />
      )}
    </>
  );
}

export default FormContainer;
