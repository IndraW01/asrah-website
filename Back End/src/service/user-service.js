import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validation } from "../validation/validation.js";
import { userGetValidation } from "../validation/user-validation.js";

const current = async (email) => {
  email = validation(userGetValidation, email);

  // Cek apakah user ada
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      name: true,
      email: true,
      image: true,
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return user;
}

export default {
  current
}