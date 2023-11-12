import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validation } from "../validation/validation.js";
import { authLogoutValidation, authLoginValidation, authRegisterValidation } from "../validation/auth-validation.js";
import { google } from "googleapis";
import { oauth2Cient, authorizationUrl } from "../config/google.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  // Cek apakah ada user valid
  const user = await prisma.user.findUnique({
    where: {
      email: request.email,
    }
  });

  if (!user) {
    throw new ResponseError(401, 'Incorrect email or password');
  }

  const checkPassword = await bcrypt.compare(request.password, user.password);

  if (!checkPassword) {
    throw new ResponseError(401, 'Incorrect email or password');
  }

  // Jika user nya valid buat access token dan refresh token
  const access_token = jwt.sign({
    name: user.name,
    email: user.email,
    is_admin: user.is_admin
  }, process.env.JWT_SCREET_KEY, {
    expiresIn: '20s'
  })

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
    const access_token = jwt.sign({
      name: decode.name,
      email: decode.email,
      is_admin: decode.is_admin
    }, process.env.JWT_SCREET_KEY, {
      expiresIn: '20s'
    })

    return {
      token: access_token
    }
  } catch (e) {
    throw new ResponseError(401, e.message);
  }
}

const logout = async (email, token) => {
  email = validation(authLogoutValidation, email);

  // Cek apakah user ada dari email dan token
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      refresh_token: token
    }
  });

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
  const { tokens } = await oauth2Cient.getToken(code);

  // Buat credential
  oauth2Cient.setCredentials(tokens);

  // Ambil data usernya
  const oauth2 = google.oauth2({
    auth: oauth2Cient,
    version: 'v2'
  });

  const { data } = await oauth2.userinfo.get();

  if (!data) {
    throw new ResponseError(404, 'User google not valid');
  }

  let user = await prisma.user.findUnique({
    where: {
      email: data.email
    }
  });

  // Buat user baru jika tidak ada email nya
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
      }
    })
  }

  // Buat jwt
  const access_token = jwt.sign({
    name: user.name,
    email: user.email,
    is_admin: user.is_admin
  }, process.env.JWT_SCREET_KEY, {
    expiresIn: '20s'
  })

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