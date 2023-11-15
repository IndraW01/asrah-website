import Joi from "joi";

export const sizeCreateValidation = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().required()
});

export const sizeGetValidation = Joi.string().required();

export const sizeUpdateValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().required()
})
