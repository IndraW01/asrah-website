import Joi from "joi";

export const userGetValidation = Joi.string().max(200).email().required();

export const userUpateValidation = Joi.object({
  name: Joi.string().max(200).required(),
  email: Joi.string().max(200).email().optional()
});