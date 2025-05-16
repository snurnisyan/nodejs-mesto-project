import CustomError from '../errors/errors';
import { AuthorizedRequest } from '../middlewares/auth';

const checkUser = (req: AuthorizedRequest) => {
  const userId = req.user?._id;
  if (!userId) {
    throw CustomError.Unauthorized('Пользователь не авторизован');
  }
  return userId;
};

export default checkUser;
