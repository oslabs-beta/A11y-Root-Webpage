import { useState, useEffect } from 'react';
import { DirectLinkGeneratorProps } from '../types';

function DirectLinkGenerator({ pageId }: DirectLinkGeneratorProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  //clicking the button will copy Tree-specific direct link to client's clipboard
  const handleClick = (): void => {
    const directLink = `https://localhost:5173/treedirect/${pageId}`;
    navigator.clipboard.writeText(directLink);
    setIsClicked(true);
  };

  useEffect(() => {
    setIsClicked(false);
  }, [pageId]);

  return (
    <button onClick={() => handleClick()}>
      {isClicked ? 'Link copied to clipboard' : 'Share this tree!'}
    </button>
  );
}

export default DirectLinkGenerator;
