import express, { Request, Response } from 'express';

//MIDDLEWARE FUNCTIONS
import PageController from '../controllers/pageController';
import ProjectController from '../controllers/projectController';
import UserController from '../controllers/userController';

const pageRoute = express.Router();

pageRoute.get(
  '/:pageId',
  PageController.getPage,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.page);
  }
);

//1.) create/find project based on projectName and user
//2.) update user to contain the projectId
//3.) create page using the found/created projectId
//4.) update project to contain the pageId
pageRoute.post(
  '/',
  ProjectController.postProject,
  UserController.updateUser,
  PageController.postPage,
  ProjectController.updateProject,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.page);
  }
);

pageRoute.delete(
  '/:pageId',
  PageController.deletePage,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.page);
  }
);

export default pageRoute;
