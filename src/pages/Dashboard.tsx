import React from 'react';
import { useState } from 'react';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '../css/Dashboard.css';

import { Button } from 'react-aria-components';

const Dashboard: React.FC = () => {
  const [url, setUrl] = useState('');
  const [parsedUrls, setParsedUrls] = useState<string[]>([]);
  const [selectedUrl, setSelectedUrl] = useState('');

  const handleSubmit = () => {
    if (url.trim()) {
      setParsedUrls([...parsedUrls, url]);
      setUrl('');
    }
  };

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedUrl(event.target.value as string);
  };

  return (
    <main>
      <div className='enterUrl'>
        <div style={{ width: '100%', maxWidth: '100%' }}>
          Enter URL:
          <input
            aria-label='Enter URL'
            value={url}
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setUrl(e.target.value)}
          />
          <Button onPress={handleSubmit}>Submit</Button>
        </div>
      </div>

      <div className='parsedUrl'>
        <label>Select a URL: </label>
        <select
          aria-label='Previously Parsed URLs'
          value={selectedUrl}
          onChange={handleSelectChange}
          // style={{
          // 	display: 'block',
          // 	width: '100%',
          // 	maxWidth: '600px',
          // 	margin: '8px 0',
          // 	border: '1px solid #ccc',
          // 	borderRadius: '4px',
          // 	padding: '8px',
          // }}
        >
          <option value='' disabled></option>
          {parsedUrls.map((url, index) => (
            <option key={index} value={url}>
              {url}
            </option>
          ))}
        </select>
      </div>
    </main>
  );
};

export default Dashboard;
