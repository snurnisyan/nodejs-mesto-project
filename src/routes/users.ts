import { Router } from 'express';
import {
  getCurrentUser,
  getUserById,
  getUsers,
  updateAvatar,
  updateUser,
} from '../controllers/users';
import { userAvatarValidator, idParamValidator, userUpdateValidator } from '../middlewares/validators';

const router = Router();
router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:id', idParamValidator, getUserById);
router.patch('/me', userUpdateValidator, updateUser);
router.patch('/me/avatar', userAvatarValidator, updateAvatar);

export default router;
