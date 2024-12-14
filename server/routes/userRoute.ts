import express, { Request, Response } from 'express';
//USER MIDDLEWARE
import UserController from '../controllers/userController';

const userRoute = express.Router();

userRoute.get(
  '/findAll/:githubId',
  UserController.fullUserDetails,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.fullUserDetails);
  }
);

userRoute.get(
  '/:userId',
  UserController.getUser,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.user);
  }
);

userRoute.post(
  '/',
  UserController.postUser,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.user);
  }
);

userRoute.patch(
  '/',
  UserController.updateUser,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.user);
  }
);

userRoute.delete(
  '/:githubId',
  UserController.deleteUser,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.user);
  }
);

export default userRoute;
