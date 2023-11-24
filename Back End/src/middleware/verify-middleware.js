import { prisma } from "../application/database.js";

export const verifyMiddleware = async (req, res, next) => {
  const userLogin = req.user;
  const user = await prisma.user.findFirst({
    where: {
      email: userLogin.email
    }
  });

  if (!user) {
    return res.status(404).json({
      code: 404,
      errors: 'User not found'
    });
  }

  if (!user.email_verified) {
    return res.status(404).json({
      code: 400,
      errors: 'Verify your email'
    });
  }

  next();
}