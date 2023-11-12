import { ValidationError } from "../error/validation-error.js";

export const validation = (schema, request) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false
  })

  if (result.error) {
    throw new ValidationError(result.error);
  }

  return result.value;
}