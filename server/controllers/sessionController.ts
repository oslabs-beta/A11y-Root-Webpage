import { Request, Response, NextFunction } from 'express';
import SessionModel from '../models/sessionModel';

const sessionController = {
  startSession: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await SessionModel.findOne({ cookieId: res.locals.ssid });
      if (!result) {
        const session = await SessionModel.create({
          cookieId: res.locals.ssid,
        });
        console.log('Session was created successfully:', session);
      }
      return next();
    } catch {
      return next({
        log: 'Error in sessionController.startSession: Failed to start session',
        status: 500,
        message: { err: 'An error occurred while starting the session' },
      });
    }
  },
};

export default sessionController;
