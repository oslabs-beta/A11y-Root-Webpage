// import * as React from 'react';
import { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import TabNavigation from '../components/TabNavigation';

function MainDashboard() {

	const [activeTab, setActiveTab] = useState('');

	const handleclick = (e: string) => {
		setActiveTab(e);
	}

	return (
		<>
			<h2>Accessibility Tree</h2>
			<ProjectForm></ProjectForm>
			<TabNavigation activeTab={activeTab} handleTabChange={handleclick} />
		</>
	)
}

export default MainDashboard;