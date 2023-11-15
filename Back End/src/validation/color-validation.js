import Joi from "joi";

export const colorCreateValidation = Joi.object({
  name: Joi.string().max(100).required(),
  hexa: Joi.string().max(100).required()
});

export const colorGetValidation = Joi.string().required();

export const colorUpdateValidation = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().max(100).required(),
  hexa: Joi.string().max(100).required()
})
