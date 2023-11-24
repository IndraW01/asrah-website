import Joi from "joi";

export const cartCreateValidation = Joi.object({
  product_id: Joi.string().max(100).required(),
  color_id: Joi.string().max(100).required(),
  size_id: Joi.string().max(100).required(),
});

export const cartIdValidation = Joi.string().max(100).required();