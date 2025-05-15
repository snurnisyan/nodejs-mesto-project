import { NextFunction } from 'express';
import CustomError from '../errors/errors';

const createBadRequestHandler = (errMessage: string, next: NextFunction) => (err: Error) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    next(CustomError.BadRequest(errMessage));
  } else {
    next(err);
  }
};

export default createBadRequestHandler;
