import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { AuthorizedRequest } from '../middlewares/auth';
import CustomError from '../errors/errors';
import createBadRequestHandler from '../utils/bad-request-handler';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.send({ data: users }))
  .catch(next);

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      throw CustomError.NotFound('Пользователь с указанным id не найден');
    }
    res.send({ data: user });
  })
  .catch(createBadRequestHandler('Передан некорректный id пользователя', next));

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(createBadRequestHandler('Переданы некорректные данные при создании пользователя', next));
};

export const updateUser = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = req.user?._id;
  if (!userId) {
    throw CustomError.Unauthorized('Пользователь не авторизован');
  }
  return User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw CustomError.NotFound('Пользователь с указанным id не найден');
      }
      res.send({ data: user });
    })
    .catch(createBadRequestHandler('Переданы некорректные данные при обновлении пользователя', next));
};

export const updateAvatar = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  const userId = req.user?._id;
  if (!userId) {
    throw CustomError.Unauthorized('Пользователь не авторизован');
  }

  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw CustomError.NotFound('Пользователь с указанным id не найден');
      }
      res.send({ data: user });
    })
    .catch(createBadRequestHandler('Переданы некорректные данные при обновлении аватара', next));
};
