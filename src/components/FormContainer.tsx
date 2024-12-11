import React, { useState, useEffect } from 'react';
import PageForm from '../components/PageForm'
import ProjectForm from '../components/ProjectForm'
import { FormContainerProps } from '../types';


function FormContainer({ setPageResults, userInfo }:FormContainerProps) {

    // project state
    // update project state handler -> passed to projectform
    // from project state fetch data from user
    // pass pages setPageResults to PageForm so that it can update pageResults

	return (
		<>
			<h2>Accessibility Tree</h2>
            <ProjectForm userInfo={userInfo}/>
            <PageForm setPageResults = {setPageResults} />
		</>
	)
}

export default FormContainer;