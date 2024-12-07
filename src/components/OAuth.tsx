import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub}from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import React from 'react';
import {loginTypes} from './AuthContext';

interface OAuthProp {
  handleOAuthClick: (type: loginTypes) => void
}

const OAuth: React.FC <OAuthProp> = ({ handleOAuthClick }) => {

	return (
		<div className='oauth-icons'>
			<motion.div
					initial={{ scale: 0 }}
					animate={{ rotate: 360, scale: 1 }}
					transition={{
						type: 'spring',
						stiffness: 260,
						damping: 30,
					}}
					whileHover={{ scale: 1.2 }}
				>
					<a href='#' className='icon' onClick={() => handleOAuthClick("github")}>
						<FontAwesomeIcon icon={faGithub} />
						Sign in with GitHub
					</a>
				</motion.div>
		</div>
	);
};

export default OAuth;