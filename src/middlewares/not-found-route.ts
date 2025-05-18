import { Request, Response, NextFunction } from 'express';
import CustomError from '../errors/errors';

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  next(CustomError.NotFound('Запрашиваемый ресурс не найден'));
};

export default notFoundRoute;
