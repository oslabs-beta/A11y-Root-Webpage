import { Request, Response, NextFunction } from 'express';

const cookieController = {
  setSSIDCookie: async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.ssid) {
      return next({
        log: 'Error in cookieController.setSSIDCookie: no ssid found',
        status: 500,
        message: { err: 'An error occurred in findin the ssid' },
      });
    }
    res.cookie('ssid', res.locals.ssid); // can't do httpOnly on https
    return next();
  },
};

module.exports = cookieController;
