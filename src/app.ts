import mongoose from 'mongoose';
import express, { Request, Response } from 'express';

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mydb');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  app.get('/', (req: Request, res: Response) => {
    res.send(req.query);
  });
});
