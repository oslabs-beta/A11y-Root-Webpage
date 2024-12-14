import express, { Request, Response } from 'express';

//PAGES MIDDLEWARE
import PageController from '../controllers/pageController';

const pageRoute = express.Router();

pageRoute.get(
  '/:pageId',
  PageController.getPage,
  (req: Request, res: Response): void => {
    res.status(200).json(res.locals.page);
  }
);

pageRoute.post(
  '/',
  PageController.postPage,
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
