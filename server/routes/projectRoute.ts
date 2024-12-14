import express, { Request, Response } from 'express';

//PROJECT MIDDLEWARE
import ProjectController from '../controllers/projectController';

const projectRoute = express.Router();

projectRoute.get(
  '/:projectId',
  ProjectController.getProject,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.project);
  }
);

projectRoute.post(
  '/',
  ProjectController.postProject,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.project);
  }
);

projectRoute.patch(
  '/',
  ProjectController.updateProject,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.project);
  }
);

projectRoute.delete(
  '/:projectId',
  ProjectController.deleteProject,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals);
  }
);

export default projectRoute;
