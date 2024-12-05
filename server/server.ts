//IMPORTED MODULES
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import https from 'https';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

//IMPORTED FILES
import dbConnect from './dbConnect.ts';


const app = express();
const PORT: number = 3333;
const __dirname = import.meta.dirname;

const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//404 handler for any unrecognized requests
app.use('*', (req, res) => res.sendStatus(404).send('Page not found'));

// Global error handler
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

//initialize database connection
dbConnect();
// Create HTTPS server
const server = https.createServer(options, app);
//initialize server
server.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`)
});
