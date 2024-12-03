import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';

const oAuthController = {
  getTemporaryCode: (req: Request, res: Response, next: NextFunction): void => {
    const temporaryCode = req.query.code;
    if (!temporaryCode) {
      return next({
        log: 'Error in oAuthController.getTemporaryCode: No code received from Github',
        status: 500,
        message: { err: 'An error occurred in retrieval of code from Github' },
      });
    }
    res.locals.temporaryCode = temporaryCode;
    next();
  },
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
      const data = await response.json();
      const githubToken = data.access_token;
      if (!githubToken) {
        return next({
          log: 'Failed to obtain access token from Github',
          status: 500,
          message: { err: 'An error occurred while obtaingin access token' },
        });
      }
      res.locals.token = githubToken;
      res.locals.ssid = githubToken;
      return next();
    } catch {
      return next({
        log: 'Error in oAuthController.requestToken:Failed to obtain access token from Github',
        status: 500,
        message: { err: 'An error occurred while obtaining access token' },
      });
    }
  },
  getUserData: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${res.locals.token}`,
        },
      });
      const githubUser = await response.json();
      res.locals.githubUser = githubUser;
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
      let user = await UserModel.findOne({ githubId: githubUser.id });
      if (!user) {
        user = new UserModel({
          githubId: githubUser.id,
          username: githubUser.login,
          profileUrl: githubUser.html_url,
          avatarUrl: githubUser.avatar_url,
          projects: githubUser.projects,
        });
        await user.save();
      }
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
};
module.exports = oAuthController;
