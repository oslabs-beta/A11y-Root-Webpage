import UserModel from '../models/userModel';
import { userController } from '../type';

const UserController = {} as userController;

UserController.getUser = async (req, res, next) => {
  //user to find: _id included as request param
  const userId = req.params.userId;

  UserModel.findById({ _id: userId })
    .then((user) => {
      //if no user found --> DB returns null
      if (!user) {
        return res.status(204).send('No user found.');
      }
      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in UserController.getUser: ERROR: ${err}`,
        message: { err: 'An error occurred while retrieving user info.' },
        status: 500,
      });
    });
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

  //create newUser in DB.
  UserModel.create(newUser)
    .then((user) => {
      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in UserController.postUser: ERROR: ${err}`,
        message: { err: 'An error occurred creating new User.' },
        status: 500,
      });
    });
};

UserController.updateUser = async (req, res, next) => {
  //parse request body
  const { githubId, projectId } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { githubId },
      { $push: { projects: projectId } },
      { new: true }
    );

    //if no user found to update --> DB returns null
    if (!user) {
      return next({
        log: `user not found`,
        message: `user not found in UserController.updateUser`,
        status: 204,
      });
    }

    res.locals.user = user;
    return next();
  } catch (error) {
    const err = {
      log:
        `Express error handler caught error in updateUser middleware` + error,
      message: { err: 'An error occurred while updating the user.' },
      status: 500,
    };
    return next(err);
  }
};

UserController.deleteUser = async (req, res, next) => {
  //user to delete: githubId included as request param
  const githubId = req.params.githubId;

  UserModel.findOneAndDelete({ githubId })
    .then((user) => {
      //if no user found --> DB returns null
      if (!user) {
        return res.status(204).send('No user found.');
      }

      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in UserController.deleteUser: ERROR: ${err}`,
        message: { err: 'An error occurred while trying to delete the user.' },
        status: 500,
      });
    });
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
