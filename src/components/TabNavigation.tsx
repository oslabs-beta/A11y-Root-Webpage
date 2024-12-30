import React from 'react';
import { TabNavigationProps } from '../types';

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  handleTabChange,
}) => {
  return (
    <section className='tabs'>
      <button
        className={activeTab === 'Non Compliance' ? 'active' : ''}
        onClick={() => handleTabChange('Non Compliance')}
      >
        Non Compliance
      </button>
      <button
        className={activeTab === 'Full Tree' ? 'active' : ''}
        onClick={() => handleTabChange('Full Tree')}
      >
        Full Tree
      </button>
      <button
        className={activeTab === 'Tab Index' ? 'active' : ''}
        onClick={() => handleTabChange('Tab Index')}
      >
        Tab Index
      </button>
      <button
        className={activeTab === 'Headers' ? 'active' : ''}
        onClick={() => handleTabChange('Headers')}
      >
        Headers
      </button>
      <button
        className={activeTab === 'Links' ? 'active' : ''}
        onClick={() => handleTabChange('Links')}
      >
        Links
      </button>
      <button
        className={activeTab === 'Non Contextual Links' ? 'active' : ''}
        onClick={() => handleTabChange('Non Contextual Links')}
      >
        Non Contextual Links
      </button>
      <button
        className={activeTab === 'Skip Link' ? 'active' : ''}
        onClick={() => handleTabChange('Skip Link')}
      >
        Skip Link
      </button>
    </section>
  );
};

export default TabNavigation;
