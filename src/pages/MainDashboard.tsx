// import * as React from 'react';
import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import TabNavigation from '../components/TabNavigation';
import { MainDashboardProps } from '../types';

function MainDashboard({ userInfo }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState('');
  const [pageResults, setPageResults] = useState(null);

  const handleclick = (e: string) => {
    setActiveTab(e);
  };

  return (
    <>
      <h2>Accessibility Tree</h2>
      <FormContainer userInfo={userInfo} setPageResults={setPageResults} />
      <TabNavigation
        activeTab={activeTab}
        handleTabChange={handleclick}
        pageResults={pageResults}
      />
    </>
  );
}

export default MainDashboard;
