import { prisma } from "../application/database.js"
import jwt from "jsonwebtoken";

const createAccessToken = (user) => {
  const access_token = jwt.sign({
    name: user.name,
    email: user.email,
    is_admin: user.is_admin
  }, process.env.JWT_SCREET_KEY, {
    expiresIn: '20s'
  })

  return access_token;
}

const createRefreshToken = async (user) => {
  const refresh_token = jwt.sign({
    name: user.name,
    email: user.email,
    is_admin: user.is_admin
  }, process.env.JWT_SCREET_KEY, {
    expiresIn: '1d'
  })

  // Update column refresh token
  await prisma.user.update({
    where: {
      email: user.email
    },
    data: {
      refresh_token: refresh_token
    }
  })

  return refresh_token;
}

const createEmailToken = async (name, email) => {
  const email_token = jwt.sign({
    name: name,
    email: email,
  }, process.env.JWT_SCREET_KEY, {
    expiresIn: '1d'
  })

  return email_token;
}

const getUserEmail = (email, token = null) => {
  let filter = {
    email: email
  }

  if (token) {
    filter.refresh_token = token;
  }

  return prisma.user.findUnique({
    where: filter
  });
}

export default {
  createAccessToken,
  createRefreshToken,
  createEmailToken,
  getUserEmail
}