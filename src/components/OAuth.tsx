import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { loginTypes } from '../types';

interface OAuthProp {
  handleOAuthClick: (type: loginTypes) => void;
}

const OAuth: React.FC<OAuthProp> = ({ handleOAuthClick }) => {
  return (
    <div className='oauth'>
      <button onClick={() => handleOAuthClick('github')}>
        <FontAwesomeIcon id='icon-github' icon={faGithub} />
        Sign in with GitHub
      </button>
    </div>
  );
};

export default OAuth;
