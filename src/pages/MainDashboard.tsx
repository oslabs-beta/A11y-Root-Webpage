// import * as React from 'react';
import { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import TabNavigation from '../components/TabNavigation';
import DisplayA11yTree from '../components/DisplayA11yTree';
import { PageResults } from '../types';
import mockPage from '../../results/a11y-tree.json'

function MainDashboard() {

	const [activeTab, setActiveTab] = useState('');
	const [pageResults, setPageResults] = useState<PageResults | null>(mockPage);

	const handleclick = (tab: string) => {
		setActiveTab(tab);
	}

	return (
		<>
			<h2>Accessibility Tree</h2>
			<ProjectForm setPageResults={setPageResults}></ProjectForm>
			{/* <FormContainer></FormContainer> */}
			<TabNavigation activeTab={activeTab} handleTabChange={handleclick} />
			<DisplayA11yTree activeTab={activeTab} pageResults={pageResults}/>
		
		</>
	)
}

export default MainDashboard;