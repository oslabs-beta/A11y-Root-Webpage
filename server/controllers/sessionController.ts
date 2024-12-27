import SessionModel from '../models/sessionModel';
import { sessionController } from '../type';

<<<<<<< HEAD
const sessionController = {
  startSession: async (req: Request, res: Response, next: NextFunction) => {
    console.log('got to session controller');
    try {
      if (!res.locals.ssid) {
        return next({
          log: 'Error in sessionController.startSession: Missing ssid in res.locals',
          status: 400,
          message: { err: 'Session ID is required to start a session' },
        });
      }
      //check if session is in database using res.locals.ssid, create session if there isnt one
      const result = await SessionModel.findOne({ cookieId: res.locals.ssid });
      if (!result) {
        const session = await SessionModel.create({
          cookieId: res.locals.ssid,
        });
        console.log('Session was created successfully:', session);
        return next();
      } else {
        console.log('Session already exists:', result);
        return next();
      }
    } catch {
=======
const SessionController = {} as sessionController;

SessionController.startSession = async (req, res, next) => {
  try {
    if (!res.locals.ssid) {
>>>>>>> aa58f93d0c336d43f4067dc3f0efea4e2b2abbed
      return next({
        log: 'Error in sessionController.startSession: Missing ssid in res.locals',
        status: 400,
        message: { err: 'Session ID is required to start a session' },
      });
    }
    //look for session in the database (based on res.locals.ssid)
    const result = await SessionModel.findOne({ cookieId: res.locals.ssid });

    if (!result) {
      //create session if one doesn't already exist
      const session = await SessionModel.create({
        cookieId: res.locals.ssid,
      });
      console.log('Session was created successfully:', session);
      return next();
    } else {
      console.log('Session already exists:', result);
      return next();
    }
  } catch {
    return next({
      log: 'Error in sessionController.startSession: Failed to start session',
      status: 500,
      message: { err: 'An error occurred while starting the session' },
    });
  }
};

export default SessionController;
