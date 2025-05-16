import { Router } from 'express';
import {
  getCurrentUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from '../controllers/users';

const router = Router();
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

export default router;
