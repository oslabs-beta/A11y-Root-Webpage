import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
// import { motion } from 'framer-motion';
import React from 'react';
import { loginTypes } from './AuthContext';

interface OAuthProp {
  // move to type folder
  handleOAuthClick: (type: loginTypes) => void;
}

// React.FC (functional component) -> Tells typescript this is a react component
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
