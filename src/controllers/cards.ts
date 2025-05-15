import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { AuthorizedRequest } from '../middlewares/auth';
import CustomError from '../errors/errors';

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

export const createCard = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const userId = req.user?._id;
  if (!userId) {
    throw CustomError.Unauthorized('Пользователь не авторизован');
  }

  return Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  return Card.findByIdAndDelete(req.params.id)
    .then((card) => {
      if (!card) {
        throw CustomError.NotFound('Нет карточки с таким id');
      }
      res.send({ data: card });
    })
    .catch(next);
};

export const likeCard = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  if (!userId) {
    throw CustomError.Unauthorized('Пользователь не авторизован');
  }
  return Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw CustomError.NotFound('Нет карточки с таким id');
      }
      res.send({ data: card });
    })
    .catch(next);
};

export const dislikeCard = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  if (!userId) {
    throw CustomError.Unauthorized('Пользователь не авторизован');
  }
  return Card.findByIdAndUpdate(
    req.params.id,
    // @ts-ignore
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw CustomError.NotFound('Нет карточки с таким id');
      }
      res.send({ data: card });
    })
    .catch(next);
};
