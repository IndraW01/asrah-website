import Joi from "joi";

export const addressCreateValidation = Joi.object({
  address_name: Joi.string().max(200).required(),
  province: Joi.string().max(200).required(),
  city: Joi.string().max(200).required(),
  subdistrict: Joi.string().max(200).required(),
  road: Joi.string().max(200).required(),
});

export const addressUpdateValidation = Joi.object({
  id: Joi.string().required(),
  address_name: Joi.string().max(200).required(),
  province: Joi.string().max(200).required(),
  city: Joi.string().max(200).required(),
  subdistrict: Joi.string().max(200).required(),
  road: Joi.string().max(200).required(),
})
