import { ErrorRequestHandler } from 'express';
import CustomError from '../errors/errors';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === 500
        ? CustomError.InternalServer()
        : message,
  });
};

export default errorHandler;
