import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/DirectLinkTree.css';
//TYPES
import { PageResults } from '../types';

//COMPONENTS
import TabNavigation from '../components/TabNavigation';
import DisplayA11yTree from '../components/DisplayA11yTree';

function DirectLinkTreeDisplay() {
  //read the projectId to display from the URL parameters
  const { pageId } = useParams();

  //state required for displaying a tree
  const [activeTab, setActiveTab] = useState('Full Tree');
  const [pageResults, setPageResults] = useState<PageResults | null>(null);
  const [projectName, setProjectName] = useState<string>('');

  const handleclick = (e: string) => {
    setActiveTab(e);
  };

  //on page load, we are fetching the relevant page based on pageId, and passing to relevant child elements
  useEffect(() => {
    const getPage = async () => {
      try {
        const response = await fetch(`https://localhost:3333/pages/${pageId}`);
        if (response.ok) {
          const data = await response.json();
          const pageDetails = data.page;
          const projectName = data.projectName;

          //turn stringified fields of page (as stored in DB) back into JSON objects for display
          pageDetails.tree = JSON.parse(pageDetails.tree);
          pageDetails.skipLink = JSON.parse(pageDetails.skipLink);
          pageDetails.h1 = JSON.parse(pageDetails.h1);
          pageDetails.tabIndex = pageDetails.tabIndex.map((node: string) => {
            return JSON.parse(node);
          });

          setPageResults(pageDetails as PageResults);
          setProjectName(projectName);
        }
      } catch (error) {
        console.error('Could not get page details: ', error);
      }
    };

    getPage();
  }, []);

  return (
    <main className='directLinkTree'>
      <h2>Accessibility (A11y) Tree Direct Link</h2>
      {pageResults && <p>Displaying Tree for: {pageResults.url}</p>}
      {pageResults && <p>From project: {projectName}</p>}
      {pageResults && pageId ? (
        <div className='tabs-and-display-container'>
          <TabNavigation
            activeTab={activeTab}
            handleTabChange={handleclick}
            pageResults={pageResults}
          />
          <DisplayA11yTree activeTab={activeTab} pageResults={pageResults} />
        </div>
      ) : (
        <p>
          400 Bad Request: The direct link used does not match any Accessibility
          Tree in our database! Please enter a valid link.
        </p>
      )}
    </main>
  );
}

export default DirectLinkTreeDisplay;
