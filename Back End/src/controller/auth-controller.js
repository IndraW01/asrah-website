import authService from "../service/auth-service.js";

const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await authService.register(request);

    res.status(200).json({
      code: 200,
      message: 'Verification link has been sent',
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await authService.login(request);

    res.cookie('refresh_token', result.refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      data: {
        token: result.access_token
      }
    });
  } catch (e) {
    next(e)
  }
}

const refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.cookies.refresh_token;
    const result = await authService.refreshToken(refresh_token);

    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    const email = req.user.email;
    const token = req.cookies.refreshToken;
    const result = await authService.logout(email, token);

    res.clearCookie('refresh_token');

    res.status(200).json({
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const loginGoogle = (req, res, next) => {
  try {
    const result = authService.loginGoogle();

    res.redirect(result);
  } catch (e) {
    next(e);
  }
}

const callback = async (req, res, next) => {
  try {
    const code = req.query.code;
    const result = await authService.callback(code);

    res.cookie('refresh_token', result.refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

    res.status(200).json({
      data: {
        token: result.access_token
      }
    })
  } catch (e) {
    next(e)
  }
}

const verifyEmail = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const token = req.params.token;
    const result = await authService.verifyEmail(userId, token);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const resend = async (req, res, next) => {
  try {
    const email = req.user.email;
    const result = await authService.resend(email);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e)
  }
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