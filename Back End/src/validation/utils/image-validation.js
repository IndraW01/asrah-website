import Joi from "joi";

export const imageValidation = Joi.object({
  extension: Joi.string().valid('.png', '.jpeg', '.jpg').required(),
  mimeType: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
  size: Joi.number().max(3000000).required()
});

export const imageValidations = Joi.array().items(Joi.object({
  extension: Joi.string().valid('.png', '.jpeg', '.jpg').required(),
  mimeType: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg').required(),
  size: Joi.number().max(3000000).required()
}));

export const fileProfOfPaymentValidation = Joi.object({
  extension: Joi.string().valid('.png', '.jpeg', '.jpg', '.pdf').required(),
  mimeType: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'application/pdf').required(),
  size: Joi.number().max(3000000).required()
});