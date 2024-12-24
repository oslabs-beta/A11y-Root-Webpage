import UserModel from '../models/userModel';
import SessionModel from '../models/sessionModel';
import { oauthController } from '../type';

const oAuthController = {} as oauthController;
//get code from request query after being redirected
oAuthController.getTemporaryCode = (req, res, next) => {
  const temporaryCode = req.query.code;

  console.log('temp code - ', temporaryCode);

  if (!temporaryCode) {
    return next({
      log: 'Error in oAuthController.getTemporaryCode: No code received from Github',
      status: 500,
      message: { err: 'An error occurred in retrieval of code from Github' },
    });
  }
  // store the code and go to next middleware
  res.locals.temporaryCode = temporaryCode;
  return next();
};
//use code to request github access token
oAuthController.requestToken = async (req, res, next) => {
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
    const githubToken = data.access_token;

    if (!githubToken) {
      return next({
        log: 'Failed to get access token from Github',
        status: 500,
        message: { err: 'An error occurred while obtaining access token' },
      });
    }

    res.locals.token = githubToken;
    return next();
  } catch {
    return next({
      log: 'Error in oAuthController.requestToken: Failed to obtain access token from Github',
      status: 500,
      message: { err: 'An error occurred while obtaining access token' },
    });
  }
};
//utilize access token to retrieve github user data from Github API
oAuthController.getUserData = async (req, res, next) => {
  try {
    const response = await fetch('https://api.github.com/user', {
      headers: {
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
    res.locals.githubUser = githubUser;
    return next();
  } catch {
    return next({
      log: 'Error in oAuthController.getUserData: Failed to obtain user data from Github',
      status: 500,
      message: { err: 'An error occurred while obtaining user data' },
    });
  }
};

oAuthController.saveUser = async (req, res, next) => {
  try {
    const { githubUser } = res.locals;

    // Check if user is in database based on their githubID
    let user = await UserModel.findOne({ githubId: githubUser.id });

    // Create new user in database if they don't exist
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

    res.locals.user = user;
    return next();
  } catch {
    return next({
      log: 'Error in oAuthController.saveUser: Failed to save user into database',
      status: 500,
      message: { err: 'An error occurred while saving the user' },
    });
  }
};
//when our webpage loads, check if user is logged in (based on cookie)
oAuthController.checkStatus = async (req, res, next) => {
  try {
    const { ssid } = req.cookies;

    if (!ssid) {
      return next({
        log: 'Error in oAuthController.checkStatus: Failed to get ssid',
        status: 500,
        message: { err: 'An error occurred while retrieving the ssid' },
      });
    }

    const session = await SessionModel.findOne({ cookieId: ssid });
    if (!session) {
      return next({
        log: 'Error in oAuthController.checkStatus: Failed to find session in database',
        status: 500,
        message: { err: 'An error occurred while finding the session' },
      });
    }

    const user = await UserModel.findById(ssid);
    if (!user) {
      return next({
        log: 'Error in oAuthController.checkStatus: Failed to check status',
        status: 500,
        message: { err: 'An error occurred while checking status' },
      });
    }

    res.locals.user = user;
    return next();
  } catch {
    return next({
      log: 'Error in oAuthController.checkStatus: Failed to find user',
      status: 500,
      message: { err: 'An error occurred while finding the user' },
    });
  }
};

export default oAuthController;
