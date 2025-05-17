import { celebrate, Joi, Segments } from 'celebrate';

export const signUpValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const signInValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

export const userUpdateValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
});

export const userAvatarValidator = celebrate({
  [Segments.BODY]: {
    avatar: Joi.string().uri(),
  },
});

export const idParamValidator = celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().hex().length(24).required(),
  },
});

export const createCardValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
});
