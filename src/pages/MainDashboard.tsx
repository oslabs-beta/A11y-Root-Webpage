// import * as React from 'react';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import TabNavigation from '../components/TabNavigation';
<<<<<<< HEAD
import DisplayA11yTree from '../components/DisplayA11yTree';
import { PageResults } from '../types';
import mockPage from '../../results/a11y-tree.json'
=======
import { MainDashboardProps } from '../types';
>>>>>>> 4c9f19e3eb98b5592a1dbb8330f13dea05edb16e

function MainDashboard({ userInfo }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState('');
  const [pageResults, setPageResults] = useState(null);

<<<<<<< HEAD
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
=======
  const handleclick = (e: string) => {
    setActiveTab(e);
  };

  return (
    <>
      <h2>Accessibility Tree</h2>
      <FormContainer userInfo={userInfo} setPageResults={setPageResults} />
      {pageResults && (
        <TabNavigation
          activeTab={activeTab}
          handleTabChange={handleclick}
          pageResults={pageResults}
        />
      )}
    </>
  );
>>>>>>> 4c9f19e3eb98b5592a1dbb8330f13dea05edb16e
}

export default MainDashboard;
