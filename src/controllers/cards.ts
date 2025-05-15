import { Request, Response } from 'express';
import Card from '../models/card';
import { AuthorizedRequest } from '../middlewares/auth';

export const getCards = (req: Request, res: Response) => {
  return Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createCard = (req: AuthorizedRequest, res: Response) => {
  const { name, link } = req.body;
  const userId = req.user?._id;
  if (!userId) {
    throw Error('Юзер не авторизован');
  }

  return Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const deleteCard = (req: Request, res: Response) => {
  return Card.findByIdAndDelete(req.params.id)
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const likeCard = (req: AuthorizedRequest, res: Response) => {
  const userId = req.user?._id;
  console.log('Like Card');
  if (!userId) {
    throw Error('Юзер не авторизован');
  }
  return Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const dislikeCard = (req: AuthorizedRequest, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw Error('Юзер не авторизован');
  }
  return Card.findByIdAndUpdate(
    req.params.id,
    // @ts-ignore
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
