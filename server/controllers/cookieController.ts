import { cookieController } from '../type';

<<<<<<< HEAD
const cookieController = {
  setSSIDCookie: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = res.locals;
    //store user mongo id inside res.locals.ssid
    res.locals.ssid = user._id.toString();
    if (!res.locals.ssid) {
      return next({
        log: 'Error in cookieController.setSSIDCookie: no ssid found',
        status: 500,
        message: { err: 'An error occurred in finding the ssid' },
      });
    }
    console.log('SSID:', res.locals.ssid);
    //set cookie name to ssid and use the same id as user mongo id
    res.cookie('ssid', res.locals.ssid, {
      httpOnly: true,
      maxAge: 6 * 60 * 60 * 1000,
    }); //6 hours
    //secure: process.env.NODE_ENV === 'production' (may need this for https)
    return next();
  },
=======
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
>>>>>>> aa58f93d0c336d43f4067dc3f0efea4e2b2abbed
};

export default CookieController;
