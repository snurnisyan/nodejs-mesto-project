import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import authMiddleware from './middlewares/auth';
import errorHandler from './middlewares/error-handler';
import { createUser, login } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';

dotenv.config();
const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
mongoose.connect(DB_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.post('/signup', createUser);
app.post('/signin', login);

app.use(authMiddleware);
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  app.get('/', (req: Request, res: Response) => {
    res.send(req.query);
  });
});
