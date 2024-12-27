import UserModel from '../models/userModel';
import { userController } from '../type';

const UserController = {} as userController;

UserController.getUser = async (req, res, next) => {
<<<<<<< HEAD
  // req: Request, res: Response, next: NextFunction
  const userId = req.params.userId;

  UserModel.findById({ _id: userId }) // use _id to find user
    .then((user) => {
      if (!user) {
        return res.status(404).send('No user found.');
      }

      res.locals.user = user;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in UserController.getUser: ERROR: ${err}`,
        message: { err: 'An error occurred retrieving user info.' },
        status: 500,
      });
    });
};

UserController.postUser = async (req, res, next) => {
  //check if required information exists in req.body
  if (
    !req.body.githubId ||
    !req.body.username ||
    !req.body.profileUrl ||
    !req.body.avatarUrl
  ) {
=======
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
>>>>>>> aa58f93d0c336d43f4067dc3f0efea4e2b2abbed
    return next({
      log: 'Error in UserController.postUser: missing required data in request body',
      message: { err: 'Missing data to create new user.' },
      status: 500,
    });
  }

  //construct the newUser
  const newUser = {
<<<<<<< HEAD
    githubId: req.body.githubId,
    username: req.body.username,
    profileUrl: req.body.profileUrl,
    avatarUrl: req.body.avatarUrl,
    projects: [],
  };

  //send newUser to DB.
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
=======
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
  } catch (error) {
    return next({
      log: `Error in UserController.postUser: ERROR: ${error}`,
      message: { err: 'An error occurred creating new User.' },
      status: 500,
    });
  }
>>>>>>> aa58f93d0c336d43f4067dc3f0efea4e2b2abbed
};

UserController.updateUser = async (req, res, next) => {
<<<<<<< HEAD
  const { githubId, projectId } = req.body;

  try {
    const user = await UserModel.findOneAndUpdate(
      { githubId },
      { $push: { projects: projectId } },
      { new: true }
    );

    if (user) {
      res.locals.user = user;
      return next();
    } else {
      return next({
        log: `user not found`,
        message: `user not found in UserController.updateUser`,
        status: 400,
      });
    }
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
  // req: Request, res: Response, next: NextFunction
  const githubId = req.params.githubId;

  UserModel.findOneAndDelete({ githubId }) // use githubId to find user
    .then((user) => {
      if (user === null) {
        return res.status(404).send('No user found.');
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
  const githubId = req.params.githubId;

  try {
    const response = await UserModel.findOne({ githubId }).populate({
=======
	const githubId = req.body.userGithubId;
	const projectId = res.locals.project._id;

  try {
    //update list of user's projects for existing user
		const user = await UserModel.findOneAndUpdate(
			{githubId},
			{$addToSet: {projects: projectId}},
      		{new: true}
		);

    //if no user found to update --> DB returns null
    if (!user) {
      return res.status(204).send('No user found.');
    }

    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: `Error in UserController.updateUser: ERROR: ${error}`,
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
  } catch (error) {
    return next({
      log: `Error in UserController.deleteUser: ERROR: ${error}`,
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
>>>>>>> aa58f93d0c336d43f4067dc3f0efea4e2b2abbed
      path: 'projects',
      populate: { path: 'pages' },
    });

<<<<<<< HEAD
    if (!response) {
      return res.status(404).send('No user found.');
    }

    res.locals.user = response;
    return next();
  } catch (err) {
    return next({
      log: `Error in UserController.fullUserDetails: ERROR: ${err}`,
=======
    //if no user found --> DB returns null
    if (!fullUserDetails) {
      return res.status(204).send('No user found.');
    }

    res.locals.fullUserDetails = fullUserDetails;
    return next();
  } catch (error) {
    return next({
      log: `Error in UserController.fullUserDetails: ERROR: ${error}`,
>>>>>>> aa58f93d0c336d43f4067dc3f0efea4e2b2abbed
      message: { err: 'An error occurred while trying get user details.' },
      status: 500,
    });
  }
};

export default UserController;
