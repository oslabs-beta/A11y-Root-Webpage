import { Button } from 'react-aria-components';

// interface handles the prop type issue in params

const handleDownloadClick = () => {
  window.location.href =
    'https://github.com/oslabs-beta/A11y-Root-Extension/releases/download/beta/a11y-root-extension-1.0.0-1.vsix';
};

const BtnDownload = () => {
  return (
    <div className='btn-download'>
      {/* temporarily changed Link to Button to avoid errors */}
      <Button onPress={handleDownloadClick}>Download VS Code Extension</Button>
    </div>
  );
};

export default BtnDownload;

// {/* Using Link component instead of Button */}
// <Link href='https://github.com/oslabs-beta/A11y-Root-Extension/releases/download/test/a11y-root-extension-0.0.1.vsix'>
// Download VS Code Extension
// </Link>
