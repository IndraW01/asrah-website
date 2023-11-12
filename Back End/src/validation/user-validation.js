import Joi from "joi";

export const userGetValidation = Joi.string().max(200).email().required();