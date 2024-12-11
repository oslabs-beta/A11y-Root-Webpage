import React from 'react';

import { PageFormProps } from '../types';

export default function PageForm({
  setPageResults,
  selectedProject,
}: PageFormProps) {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chosenPage = selectedProject.pages.find(
      (page) => page._id === event.target.value
    );
    if(chosenPage){
    setPageResults(chosenPage);
    }
    console.log('selected page: ', JSON.stringify(chosenPage));
  };

  return (
    <form id='pages-form'>
      <label>Select a page:</label>
      <select onChange={handleSelectChange}>
        {
          <option value='' selected disabled hidden>
            -- Select a Page --
          </option>
        }
        {selectedProject.pages.map((page) => (
          <option key={page._id} value={page._id}>
            {page.url}
          </option>
        ))}
      </select>
    </form>
  );
}
