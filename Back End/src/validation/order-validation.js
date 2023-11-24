import Joi from "joi";

export const orderCreateValidation = Joi.object({
  name: Joi.string().max(200).required(),
  email: Joi.string().max(200).email().required(),
  phone_number: Joi.string().max(14).required(),
  address_id: Joi.string().max(100).required(),
  price: Joi.number().positive().required(),
  shipping_method: Joi.string().max(100).required(),
  shipping: Joi.number().positive().required()
});

export const orderGetValidation = Joi.string().max(100).required();

export const orderUpdateProfOfPayment = Joi.required().messages({
  'any.required': 'Prof Of Payment is required'
});