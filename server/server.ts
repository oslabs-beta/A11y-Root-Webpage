//IMPORTED PACKAGES
import express, { Request, Response, NextFunction } from 'express';
import https from 'https';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

//DATABASE CONNECTION MODULE
import dbConnect from './dbConnect.ts';

//IMPORTED ROUTES
import userRoute from './routes/userRoute.ts';
import projectRoute from './routes/projectRoute.ts';
import pageRoute from './routes/pageRoute.ts';
import authRoute from './routes/authRoute.ts';

//DEFINE SERVER VARIABLES
const app = express();
const PORT: number = 3333;
const __dirname = import.meta.dirname;

//HTTPS FILES
const options = {
  key: fs.readFileSync(path.join(__dirname, 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'localhost.pem')),
};

//PARSING MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

//SERVER ROUTES
app.use('/users', userRoute);
app.use('/projects', projectRoute);
app.use('/pages', pageRoute);
app.use('/auth', authRoute);

//SERVE HOMEPAGE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

//404 FOR UNRECOGNIZED REQUESTS
app.use('*', (req, res) => res.sendStatus(404).send('Page not found'));

//GLOBAL ERROR HANDLER
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
app.use((err, req: Request, res: Response, next: NextFunction): void => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

//CREATE HTTPS SERVER USING EXPRESS APP
const server = https.createServer(options, app);

//INITIALIZE DATABASE CONNECTION
dbConnect();

//INITIALIZE SERVER
server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
