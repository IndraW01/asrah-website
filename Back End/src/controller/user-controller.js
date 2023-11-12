import userService from "../service/user-service.js";

const current = async (req, res, next) => {
  try {
    const email = req.user.email;
    const result = await userService.current(email);

    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (e) {
    next(e);
  }
}


export default {
  current,
}