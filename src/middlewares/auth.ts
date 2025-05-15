import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export interface AuthorizedRequest extends Request {
  user?: {
    _id: mongoose.Types.ObjectId;
  }
}

const authMiddleware = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('6820bf25db3e5d8b73cb195f'),
  };
  next();
};

export default authMiddleware;
