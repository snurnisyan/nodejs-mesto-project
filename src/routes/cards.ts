import { Router } from 'express';
import {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards';
import { createCardValidator, idParamValidator } from '../middlewares/validators';

const router = Router();
router.get('/', getCards);
router.post('/', createCardValidator, createCard);
router.delete('/:id', idParamValidator, deleteCard);
router.put('/:id/likes', idParamValidator, likeCard);
router.delete('/:id/likes', idParamValidator, dislikeCard);

export default router;
