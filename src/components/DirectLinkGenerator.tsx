import { useState, useEffect } from 'react';
import { DirectLinkGeneratorProps } from '../types';

const DOMAIN_NAME = process.env.VITE_DOMAIN_NAME || 'https://localhost:5173';

function DirectLinkGenerator({ pageId }: DirectLinkGeneratorProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  //clicking the button will copy Tree-specific direct link to client's clipboard
  const handleClick = (): void => {
    const directLink = `${DOMAIN_NAME}/treedirect/${pageId}`;
    navigator.clipboard.writeText(directLink);
    setIsClicked(true);
  };

  useEffect(() => {
    setIsClicked(false);
  }, [pageId]);

  return (
    <button id='copyDirectLink' onClick={() => handleClick()}>
      {isClicked ? 'Link copied to clipboard' : 'Share this tree!'}
    </button>
  );
}

export default DirectLinkGenerator;
