import { useState } from 'react';
import FormContainer from '../components/FormContainer';
import TabNavigation from '../components/TabNavigation';
import DisplayA11yTree from '../components/DisplayA11yTree';
import { MainDashboardProps } from '../types';
import { PageResults } from '../types';
import '../css/Dashboard.css';

function MainDashboard({ userInfo }: MainDashboardProps) {
  const [activeTab, setActiveTab] = useState('');
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
      <div className='tabs-and-display-container'>
        {pageResults && (
          <TabNavigation
            activeTab={activeTab}
            handleTabChange={handleclick}
            pageResults={pageResults}
          />
        )}
        <DisplayA11yTree activeTab={activeTab} pageResults={pageResults} />
      </div>
    </main>
  );
}

export default MainDashboard;
