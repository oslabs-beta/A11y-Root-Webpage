// IMPORTED PACKAGES
import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';

// DATABASE CONNECTION MODULE
import dbConnect from './dbConnect';

// IMPORTED ROUTES
import userRoute from './routes/userRoute';
import projectRoute from './routes/projectRoute';
import pageRoute from './routes/pageRoute';
import authRoute from './routes/authRoute';

// DEFINE SERVER VARIABLES
const app = express();
const PORT = process.env.PORT || 3333; // Render uses the PORT environment variable

// PARSING MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());

// SERVE STATIC FILES (React Frontend)
const __dirname = path.resolve(); // Use path.resolve for ES modules
app.use(express.static(path.join(__dirname, 'dist'))); // Serve React build files

// SERVER ROUTES
app.use('/users', userRoute);
app.use('/projects', projectRoute);
app.use('/pages', pageRoute);
app.use('/auth', authRoute);

// SERVE REACT FRONTEND FOR ALL OTHER ROUTES
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 404 FOR UNRECOGNIZED REQUESTS
app.use('*', (req: Request, res: Response) => {
  res.status(404).send('Page not found');
});

// GLOBAL ERROR HANDLER
interface CustomError extends Error {
  status?: number;
  log?: string;
}

app.use((err: CustomError, req: Request, res: Response): void => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, {
    log: err.log || defaultErr.log,
    status: err.status || defaultErr.status,
    message: err.message || defaultErr.message,
  });
  console.error(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

// INITIALIZE DATABASE CONNECTION
(async () => {
  try {
    await dbConnect();
    console.log('Database connected successfully.');
  } catch (err) {
    console.error('Failed to connect to the database:', err);
    process.exit(1); // Exit if the database connection fails
  }
})();

// INITIALIZE SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
