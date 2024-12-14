import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from 'react-aria-components';

import { PageFormProps } from '../types';
import { useEffect } from 'react';

export default function PageForm({
  pageResults,
  setPageResults,
  selectedProject,
}: PageFormProps) {
  const handleSelectChange = (pageId: string) => {
    const chosenPage = selectedProject.pages.find(
      (page) => page._id === pageId
    );
    if (chosenPage) {
      setPageResults(chosenPage);
    }
  };

  useEffect(() => {}, [pageResults]);

  return (
    <div id='page-form'>
      <MenuTrigger>
        <Button id='page-form-button' aria-label='Menu'>
          {pageResults ? pageResults.url : '-- Select a Page --'}
        </Button>
        <Popover>
          <Menu id='menu-page'>
            {selectedProject.pages.map((page) => (
              <MenuItem
                className='menu-item'
                onAction={() => handleSelectChange(page._id)}
              >
                {page.url}
              </MenuItem>
            ))}
          </Menu>
        </Popover>
      </MenuTrigger>
    </div>
  );
}
