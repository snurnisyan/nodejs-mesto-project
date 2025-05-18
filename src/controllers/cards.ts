import { NextFunction, Request, Response } from 'express';
import Card from '../models/card';
import { AuthorizedRequest } from '../middlewares/auth';
import CustomError from '../errors/errors';
import createBadRequestHandler from '../utils/bad-request-handler';
import checkUser from '../utils/user-check-handler';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(next);

export const createCard = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const userId = checkUser(req);
  return Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(createBadRequestHandler('Переданы некорректные данные при создании карточки', next));
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const userId = checkUser(req);
  return Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw CustomError.NotFound('Карточка с указанным id не найдена');
      }
      if (card.owner.toString() !== userId.toString()) {
        throw CustomError.Forbidden('Недостаточно прав для удаления карточки');
      }
      Card.findByIdAndDelete(req.params.id)
        .then((deletedCard) => res.send({ data: deletedCard }))
        .catch(next);
    })
    .catch(createBadRequestHandler('Передан некорректный id карточки', next));
};

export const likeCard = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const userId = checkUser(req);
  return Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw CustomError.NotFound('Карточка с указанным id не найдена');
      }
      res.send({ data: card });
    })
    .catch(createBadRequestHandler('Переданы некорректные данные для постановки лайка или некорректный id карточки', next));
};

export const dislikeCard = (req: AuthorizedRequest, res: Response, next: NextFunction) => {
  const userId = checkUser(req);
  return Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw CustomError.NotFound('Карточка с указанным id не найдена');
      }
      res.send({ data: card });
    })
    .catch(createBadRequestHandler('Переданы некорректные данные для снятия лайка или некорректный id карточки', next));
};
