import React from 'react';
import { loginTypes } from '../types';
interface OAuthProp {
    handleOAuthClick: (type: loginTypes) => void;
}
declare const OAuth: React.FC<OAuthProp>;
export default OAuth;
