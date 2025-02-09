import express, { Request, Response } from 'express';

//AUTHENTICATION MIDDLEWARE
import cookieController from '../controllers/cookieController';
import oAuthController from '../controllers/oAuthController';
import sessionController from '../controllers/sessionController';

const authRoute = express.Router();

const DOMAIN_NAME = process.env.VITE_DOMAIN_NAME || 'http://localhost:5173/';

//AUTHENTICATION ENDPOINTS

//start of github oAuth
authRoute.get('/', (req: Request, res: Response) => {
  const githubOAuthURl = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_CALLBACK_URL}&force_login=true`;
  return res.redirect(githubOAuthURl);
});

//github oAuth callback
authRoute.get(
  '/callback',
  oAuthController.getTemporaryCode,
  oAuthController.requestToken,
  oAuthController.getUserData,
  oAuthController.saveUser,
  cookieController.setSSIDCookie,
  sessionController.startSession,
  (req: Request, res: Response) => {
    return res.redirect(DOMAIN_NAME);
  }
);

//'https://localhost:5173/' for above

//check if client has active login
authRoute.get(
  '/checkstatus',
  oAuthController.checkStatus,
  (req: Request, res: Response) => {
    res.header('Access-Control-Allow-Credentials', true);
    return res.status(200).json(res.locals.user);
  }
);

export default authRoute;
