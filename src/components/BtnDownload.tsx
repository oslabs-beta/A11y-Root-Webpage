import { Button } from 'react-aria-components';

// interface handles the prop type issue in params
interface BtnDownloadProps {
  handleDownload: () => void;
}

const BtnDownload: React.FC<BtnDownloadProps> = ({ handleDownload }: BtnDownloadProps) => {
  return (
    <div className='btn-download'>
      {/* react-aria-components have built-in a11y compliant components that work as expected, even in a div */}
      <Button className='btn' onPress={handleDownload}>
        Download VS Code Extension
      </Button>
    </div>
  );
};

export default BtnDownload;
