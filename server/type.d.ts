import { Request, Response, NextFunction } from 'express';

export type ServerError = {
  log: string;
  status?: number;
  message: { err: string };
  success: boolean;
};

export type userController = {
  getUser: (req: Request, res: Response, next: NextFunction) => void;
  postUser: (req: Request, res: Response, next: NextFunction) => void;
  updateUser: (req: Request, res: Response, next: NextFunction) => void;
}