import { Request, Response } from 'express';
import User from '../models/user';
import { AuthorizedRequest } from '../middlewares/auth';

export const getUsers = (req: Request, res: Response) => {
  return User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getUserById = (req: Request, res: Response) => {
  return User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateUser = (req: AuthorizedRequest, res: Response) => {
  const { name, about } = req.body;
  const userId = req.user?._id;
  if (!userId) {
    throw Error('Юзер не авторизован');
  }

  return User.findByIdAndUpdate(userId, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateAvatar = (req: AuthorizedRequest, res: Response) => {
  const { avatar } = req.body;
  const userId = req.user?._id;
  if (!userId) {
    throw Error('Юзер не авторизован');
  }

  return User.findByIdAndUpdate(userId, { avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
