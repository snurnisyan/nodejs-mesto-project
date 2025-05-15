import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { AuthorizedRequest } from '../middlewares/auth';
import CustomError from '../errors/errors';

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  return User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw CustomError.NotFound('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch(next);
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(next);
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
        throw CustomError.NotFound('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch(next);
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
        throw CustomError.NotFound('Нет пользователя с таким id');
      }
      res.send({ data: user });
    })
    .catch(next);
};
