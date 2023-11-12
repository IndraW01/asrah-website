import Joi from "joi";

export const authRegisterValidation = Joi.object({
  name: Joi.string().max(200).required(),
  email: Joi.string().max(200).email().required(),
  password: Joi.string().max(200).required(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': "confirm_password is not the same"
  }),
}).with('password', 'confirm_password');

export const authLoginValidation = Joi.object({
  email: Joi.string().max(200).email().required(),
  password: Joi.string().max(200).required(),
});

export const authLogoutValidation = Joi.string().max(200).email().required();