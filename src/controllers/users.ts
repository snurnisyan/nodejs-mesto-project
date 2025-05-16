import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user';
import { AuthorizedRequest } from '../middlewares/auth';
import CustomError from '../errors/errors';
import createBadRequestHandler from '../utils/bad-request-handler';
import checkUser from '../utils/user-check-handler';

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
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const newUser: Partial<IUser> = user.toObject();
      delete newUser.password;
      res.send({ data: newUser });
    })
    .catch((err) => {
      if (err.message.includes('E11000 duplicate key error')) {
        next(CustomError.Conflict('Пользователь с таким email уже существует'));
      } else {
        createBadRequestHandler('Переданы некорректные данные при создании пользователя', next);
      }
    });
};

export const updateUser = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  const userId = checkUser(req);
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
  const userId = checkUser(req);
  return User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw CustomError.NotFound('Пользователь с указанным id не найден');
      }
      res.send({ data: user });
    })
    .catch(createBadRequestHandler('Переданы некорректные данные при обновлении аватара', next));
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true });
      res.send({ message: 'OK' });
    })
    .catch(createBadRequestHandler('Переданы некорректные данные для авторизации', next));
};

export const getCurrentUser = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const userId = checkUser(req);
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        throw CustomError.NotFound('Пользователь с указанным id не найден');
      }
      res.send({ data: user });
    })
    .catch(createBadRequestHandler('Передан некорректный id пользователя', next));
};
