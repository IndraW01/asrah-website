import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validation } from "../validation/validation.js";
import { authLogoutValidation, authLoginValidation, authRegisterValidation } from "../validation/auth-validation.js";
import { google } from "googleapis";
import { oauth2Client, authorizationUrl } from "../config/google.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authModel from "../model/auth-model.js";

const register = async (request) => {
  // Validasi request
  request = validation(authRegisterValidation, request);

  // Cek apakah emailnya sudah ada
  const checkEmail = await prisma.user.count({
    where: {
      email: request.email
    }
  });

  if (checkEmail == 1) {
    throw new ResponseError(400, 'Email already in use');
  }

  // Bcrypt password
  request.password = await bcrypt.hash(request.password, 10);

  // Create User
  return prisma.user.create({
    data: {
      name: request.name,
      email: request.email,
      password: request.password
    },
    select: {
      name: true,
      email: true,
    }
  });
}

const login = async (request) => {
  // Validasi request
  request = validation(authLoginValidation, request);

  // Get user
  const user = await authModel.getUserEmail(request.email);

  if (!user) {
    throw new ResponseError(401, 'Incorrect email or password');
  }

  const checkPassword = await bcrypt.compare(request.password, user.password);

  if (!checkPassword) {
    throw new ResponseError(401, 'Incorrect email or password');
  }

  // Buat token dan return tokennya
  const access_token = authModel.createAccessToken(user);
  const refresh_token = await authModel.createRefreshToken(user);

  return {
    access_token: access_token,
    refresh_token: refresh_token
  }
}

const refreshToken = async (token) => {
  // Check apakh refresh token nya ada di cookie
  if (!token) {
    throw new ResponseError(401, 'Token not found');
  }

  // Check refresh token ada di database
  const checkToken = await prisma.user.findFirst({
    where: {
      refresh_token: token
    }
  });

  if (!checkToken) {
    throw new ResponseError(401, 'Token not found');
  }

  // Decode jwt refresh token
  try {
    const decode = jwt.verify(token, process.env.JWT_SCREET_KEY);

    // Jika ada refresh tokennya
    const access_token = authModel.createAccessToken(decode);

    return {
      token: access_token
    }
  } catch (e) {
    // Jika refresh tokennya expired
    // Update Refresh tokennya menjadi null
    await prisma.user.update({
      where: {
        email: checkToken.email
      },
      data: {
        refresh_token: null
      }
    });

    throw new ResponseError(401, e.message);
  }
}

const logout = async (email, token) => {
  email = validation(authLogoutValidation, email);

  // Cek apakah user ada dari email dan token
  const user = await authModel.getUserEmail(email, token);

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Update Refresh tokennya menjadi null
  await prisma.user.update({
    where: {
      email: email
    },
    data: {
      refresh_token: null
    }
  });

  return 'Berhasil logout';
};

const loginGoogle = () => {
  return authorizationUrl;
}

const callback = async (code) => {
  // Ambil tokennya
  const { tokens } = await oauth2Client.getToken(code);

  // Buat credential
  oauth2Client.setCredentials(tokens);

  // Ambil data usernya
  const oauth2 = google.oauth2({
    auth: oauth2Client,
    version: 'v2'
  });

  const { data } = await oauth2.userinfo.get();

  if (!data) {
    throw new ResponseError(404, 'User google not valid');
  }

  // Get user
  let user = await authModel.getUserEmail(data.email);

  // Buat user baru jika tidak ada email nya
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      }
    })
  }

  // Buat token dan return tokennya
  const access_token = authModel.createAccessToken(user);
  const refresh_token = await authModel.createRefreshToken(user);

  return {
    access_token: access_token,
    refresh_token: refresh_token
  }
}

export default {
  register,
  login,
  refreshToken,
  logout,
  loginGoogle,
  callback
}