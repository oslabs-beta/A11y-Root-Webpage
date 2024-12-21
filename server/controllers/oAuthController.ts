import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import SessionModel from '../models/sessionModel';

const oAuthController = {
  //get code from request query and store it
  getTemporaryCode: (req: Request, res: Response, next: NextFunction): void => {
    console.log('Request Query:', req.query);
    const temporaryCode = req.query.code;
    if (!temporaryCode) {
      return next({
        log: 'Error in oAuthController.getTemporaryCode: No code received from Github',
        status: 500,
        message: { err: 'An error occurred in retrieval of code from Github' },
      });
    }
    res.locals.temporaryCode = temporaryCode;
    return next();
  },
  //use clientid, clientsecret, and code pulled from earlier to make a fetch request for a github token
  requestToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await fetch(
        'https://github.com/login/oauth/access_token',
        {
          method: 'POST',
          body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: res.locals.temporaryCode,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      if (!response.ok) {
        return next({
          log: `Error in oAuthController.requestToken: GitHub API responded with status ${response.status}`,
          status: 500,
          message: { err: 'Failed to obtain access token from GitHub' },
        });
      }
      const data = await response.json();
      console.log('Data:', data);
      const githubToken = data.access_token;
      if (!githubToken) {
        return next({
          log: 'Failed to get access token from Github',
          status: 500,
          message: { err: 'An error occurred while obtaingin access token' },
        });
      }
      //store token in res.locals
      res.locals.token = githubToken;
      return next();
    } catch {
      return next({
        log: 'Error in oAuthController.requestToken:Failed to obtain access token from Github',
        status: 500,
        message: { err: 'An error occurred while obtaining access token' },
      });
    }
  },
  //use github token to make a fetch request to github api and retrieve user data
  getUserData: async (req: Request, res: Response, next: NextFunction) => {
    console.log('got here');
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          //send Bearer token to get access to user data
          Authorization: `Bearer ${res.locals.token}`,
        },
      });
      if (!response.ok) {
        return next({
          log: `Error in oAuthController.getUserData: Could not get a response`,
          status: 500,
          message: { err: 'Failed to obtain user data from GitHub' },
        });
      }
      const githubUser = await response.json();
      console.log('Github User:', githubUser);
      //store user data
      res.locals.githubUser = githubUser;
      return next();
    } catch {
      return next({
        log: 'Error in oAuthController.getUserData:Failed to obtain user Data from Github',
        status: 500,
        message: { err: 'An error occurred while obtaining user data' },
      });
    }
  },

  saveUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { githubUser } = res.locals;
      //find user in database based off of the id from user data
      let user = await UserModel.findOne({ githubId: githubUser.id });
      //create user in database if they dont already exist
      if (!user) {
        user = new UserModel({
          githubId: githubUser.id,
          username: githubUser.login,
          profileUrl: githubUser.html_url,
          avatarUrl: githubUser.avatar_url,
          projects: githubUser.projects || [],
        });
        await user.save();
      }
      console.log('user:', user);
      //store user
      res.locals.user = user;
      return next();
    } catch {
      return next({
        log: 'Error in oAuthController.saveUser:Failed to save user into database',
        status: 500,
        message: { err: 'An error occurred while saving the user' },
      });
    }
  },

  //when our webpage loads, check if user is logged in (based on cookie)
  checkStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ssid } = req.cookies;
      //check if ssid from cookies exists
      if (!ssid) {
        return next({
          log: 'Error in oAuthController.checkStatus:Failed to get ssid',
          status: 500,
          message: { err: 'An error occurred while retrieving the ssid' },
        });
      }
      //check if session is in database using ssid from cookies
      const session = await SessionModel.findOne({ cookieId: ssid });
      if (!session) {
        return next({
          log: 'Error in oAuthController.checkStatus:Failed to find session in database',
          status: 500,
          message: { err: 'An error occurred while finding the session' },
        });
      }
      //check if user exists in database
      const user = await UserModel.findById(ssid);
      if (!user) {
        return next({
          log: 'Error in oAuthController.checkStatus:Failed to check status',
          status: 500,
          message: { err: 'An error occurred while checking status' },
        });
      }
      //store user
      res.locals.user = user;

      return next();
    } catch {
      return next({
        log: 'Error in oAuthController.checkStatus:Failed to find user',
        status: 500,
        message: { err: 'An error occurred while finding the user' },
      });
    }
  },
};
export default oAuthController;
