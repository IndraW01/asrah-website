import Joi from "joi";

export const categoryCreateValidation = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().required()
});

export const categoryGetValidation = Joi.string().required();

export const categoryUpdateValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().required()
})
