// import * as React from 'react';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import TabNavigation from '../components/TabNavigation';
import DisplayA11yTree from '../components/DisplayA11yTree';
import { MainDashboardProps } from '../types';
import { PageResults } from '../types';

function MainDashboard({ userInfo }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState('');
  const [pageResults, setPageResults] = useState<PageResults | null>(null);

  const handleclick = (e: string) => {
    setActiveTab(e);
  };

  return (
    <>
      <h2>Accessibility Tree</h2>
      <FormContainer userInfo={userInfo} setPageResults={setPageResults} pageResults = {pageResults} />
      {pageResults && (
        <TabNavigation
          activeTab={activeTab}
          handleTabChange={handleclick}
          pageResults={pageResults}
        />
      )}
      <DisplayA11yTree activeTab={activeTab} pageResults={pageResults} />
    </>
  );
}

export default MainDashboard;
