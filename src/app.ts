import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import authMiddleware from './middlewares/auth';
import errorHandler from './middlewares/error-handler';

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authMiddleware);
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  app.get('/', (req: Request, res: Response) => {
    res.send(req.query);
  });
});
