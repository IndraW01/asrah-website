import Joi from "joi"

export const productCreateValidation = Joi.object({
  // category_id: Joi.string().max(100).required(),
  name: Joi.string().max(200).required(),
  gender_category: Joi.string().valid('PRIA', 'WANITA', 'UNISEX').required(),
  // stok: Joi.number().min(0).positive().required(),s
  price: Joi.number().min(0).positive().required(),
  description: Joi.string().required(),
  images: Joi.required(),
  colors: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ).required()
});

export const productGetValidation = Joi.object({
  name: Joi.string().max(200),
  gender_category: Joi.string().valid('WANITA', 'PRIA', 'UNISEX'),
  take: Joi.number().positive()
});

export const productGetByIdValidation = Joi.string().required()

export const productUpdateValidation = Joi.object({
  id: Joi.string().required(),
  // category_id: Joi.string().max(100).required(),
  name: Joi.string().max(200).required(),
  gender_category: Joi.string().valid('PRIA', 'WANITA', 'UNISEX').required(),
  // stok: Joi.number().min(0).positive().required(),s
  price: Joi.number().min(0).positive().required(),
  description: Joi.string().required(),
  // Kalau dibutuhkan
  // images: Joi.optional(),
  colors: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ).required()
});