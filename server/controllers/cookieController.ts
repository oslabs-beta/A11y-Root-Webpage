import { cookieController } from '../type';

const CookieController = {} as cookieController;

CookieController.setSSIDCookie = async (req, res, next) => {
  const { user } = res.locals;
  res.locals.ssid = user._id.toString();

  if (!res.locals.ssid) {
    return next({
      log: 'Error in cookieController.setSSIDCookie: no ssid found',
      status: 500,
      message: { err: 'An error occurred in finding the ssid' },
    });
  }

  //set cookie to id stored in res.locals.ssid
  res.cookie('ssid', res.locals.ssid, {
    httpOnly: true,
    maxAge: 6 * 60 * 60 * 1000,
  }); // 6 hours
  // secure: process.env.NODE_ENV === 'production' (may need this for https)
  return next();
};

export default CookieController;
