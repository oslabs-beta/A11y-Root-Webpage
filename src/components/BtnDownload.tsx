import { Button } from 'react-aria-components';

// interface handles the prop type issue in params

const BtnDownload = () => {
  return (
    <div className='btn-download'>
      {/* Using Link component instead of Button */}
      <Button href='https://github.com/oslabs-beta/A11y-Root-Extension/releases/download/test/a11y-root-extension-0.0.1.vsix'>
        Download VS Code Extension
      </Button>
    </div>
  );
};

export default BtnDownload;
