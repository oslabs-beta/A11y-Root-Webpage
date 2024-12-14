import UserModel from '../models/userModel';
import { userController } from '../type';

const UserController = {} as userController;

UserController.getUser = async (req, res, next) => {
  //user to find: _id included as request param
  const userId = req.params.userId;
  try {
    const user = await UserModel.findById({ _id: userId });
    //if no user found --> DB returns null
    if (!user) {
      return res.status(204).send('No user found.');
    }
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in UserController.getUser: ERROR: ${err}`,
      message: { err: 'An error occurred while retrieving user info.' },
      status: 500,
    });
  }
};

UserController.postUser = async (req, res, next) => {
  //parse request body
  const { githubId, username, profileUrl, avatarUrl } = req.body;
  //check if required information exists in req.body
  if (!githubId || !username || !profileUrl || !avatarUrl) {
    return next({
      log: 'Error in UserController.postUser: missing required data in request body',
      message: { err: 'Missing data to create new user.' },
      status: 500,
    });
  }

  //construct the newUser
  const newUser = {
    githubId,
    username,
    profileUrl,
    avatarUrl,
    projects: [],
  };

  try {
    //create newUser in DB.
    const user = await UserModel.create(newUser);
    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in UserController.postUser: ERROR: ${err}`,
      message: { err: 'An error occurred creating new User.' },
      status: 500,
    });
  }
};

UserController.updateUser = async (req, res, next) => {
  //parse request body
  const { githubId, projectId } = req.body;

  try {
    //update list of user's projects for existing user
    const user = await UserModel.findOneAndUpdate(
      { githubId },
      { $push: { projects: projectId } },
      { new: true }
    );

    //if no user found to update --> DB returns null
    if (!user) {
      return res.status(204).send('No user found.');
    }

    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in UserController.updateUser: ERROR: ${err}`,
      message: { err: 'An error occurred while updating the user.' },
      status: 500,
    });
  }
};

UserController.deleteUser = async (req, res, next) => {
  //user to delete: githubId included as request param
  const githubId = req.params.githubId;

  try {
    const user = await UserModel.findOneAndDelete({ githubId });
    //if no user found --> DB returns null
    if (!user) {
      return res.status(204).send('No user found.');
    }

    res.locals.user = user;
    return next();
  } catch (err) {
    return next({
      log: `Error in UserController.deleteUser: ERROR: ${err}`,
      message: { err: 'An error occurred while trying to delete the user.' },
      status: 500,
    });
  }
};

UserController.fullUserDetails = async (req, res, next) => {
  //user to find: githubId included as request param
  const githubId = req.params.githubId;

  try {
    //populate method replaces project/page id references with the actual documents
    const fullUserDetails = await UserModel.findOne({ githubId }).populate({
      path: 'projects',
      populate: { path: 'pages' },
    });

    //if no user found --> DB returns null
    if (!fullUserDetails) {
      return res.status(204).send('No user found.');
    }

    res.locals.fullUserDetails = fullUserDetails;
    return next();
  } catch (err) {
    return next({
      log: `Error in UserController.fullUserDetails: ERROR: ${err}`,
      message: { err: 'An error occurred while trying get user details.' },
      status: 500,
    });
  }
};

export default UserController;
