import { useState } from 'react';

import '../css/Dashboard.css';
import { MainDashboardProps, PageResults } from '../types';

//COMPONENTS
import FormContainer from '../components/FormContainer';
import TabNavigation from '../components/TabNavigation';
import DisplayA11yTree from '../components/DisplayA11yTree';
import DirectLinkGenerator from '../components/DirectLinkGenerator';

function MainDashboard({ userInfo }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState('Non Compliance');
  const [pageResults, setPageResults] = useState<PageResults | null>(null);

  const handleclick = (e: string) => {
    setActiveTab(e);
  };

  return (
    <main className='dashboard'>
      <h2>Accessibility (A11y) Tree Dashboard</h2>
      <FormContainer
        userInfo={userInfo}
        setPageResults={setPageResults}
        pageResults={pageResults}
      />
      {pageResults && <DirectLinkGenerator pageId={pageResults._id} />}
      <div className='tabs-and-display-container'>
        {pageResults && (
          <TabNavigation
            activeTab={activeTab}
            handleTabChange={handleclick}
            pageResults={pageResults}
          />
        )}
        {pageResults && (
          <DisplayA11yTree activeTab={activeTab} pageResults={pageResults} />
        )}
      </div>
    </main>
  );
}

export default MainDashboard;
