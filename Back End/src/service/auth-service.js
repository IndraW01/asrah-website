import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validation } from "../validation/validation.js";
import { authLogoutValidation, authLoginValidation, authRegisterValidation } from "../validation/auth-validation.js";
import { google } from "googleapis";
import { oauth2Client, authorizationUrl } from "../config/google.js";
import { sendEmailVerification } from "../config/email.js";
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

  // create email token
  const token = await authModel.createEmailToken(request.name, request.email);

  // Create User dan token
  const user = await prisma.user.create({
    data: {
      name: request.name,
      email: request.email,
      password: request.password,
      token: {
        create:
        {
          token: token
        }
      }
    },
    select: {
      id: true,
      name: true,
      email: true,
    }
  });

  // kirim email verifikasi
  sendEmailVerification({
    to: user.email,
    nama: user.name,
    token: token,
    userId: user.id
  })

  // Hapus user idnya
  delete user.id;

  return user;
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
        email_verified: true
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

const verifyEmail = async (userId, token) => {
  // Cek apakah user dan tokennya ada
  const userToken = await prisma.token.findFirst({
    where: {
      user_id: userId,
      token: token
    }
  });

  if (!userToken) {
    throw new ResponseError(400, 'User and token do not exist, re-send verification email');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) {
    throw new ResponseError(400, "We were unable to find a user for this verification. Please SignUp!");
  }

  // Cek jika usernya sudah verified atau belum
  if (user.email_verified) {
    return "User has been already verified. Please Login"
  }

  // Cek apakah tokennya belum expire
  try {
    const decode = jwt.verify(token, process.env.JWT_SCREET_KEY);

    // update user nya
    await prisma.user.update({
      where: {
        email: decode.email
      },
      data: {
        email_verified: true
      }
    })

    return "Your account has been successfully verified";
  } catch (e) {
    throw new ResponseError(400, "Your verification link may have expired. Please click on resend for verify your Email.");
  }
}

const resend = async (email) => {
  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })

  if (user.email_verified) {
    return "User has been already verified"
  }

  // create email token
  const token = await authModel.createEmailToken(user.name, user.email);

  // update tokennya
  await prisma.user.update({
    where: {
      email: email
    },
    data: {
      token: {
        update: {
          token: token
        }
      }
    }
  })

  // kirim email verifikasi
  sendEmailVerification({
    to: user.email,
    nama: user.name,
    token: token,
    userId: user.id
  })

  return "Verification link has been sent";
}

export default {
  register,
  login,
  refreshToken,
  logout,
  loginGoogle,
  callback,
  verifyEmail,
  resend
}