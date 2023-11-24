import orderService from "../service/order-service.js";

const create = async (req, res, next) => {
  try {
    const email = req.user.email;
    const request = req.body;
    const result = await orderService.create(request, email);

    res.status(200).json({
      code: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
}

const get = async (req, res, next) => {
  try {
    const email = req.user.email;
    const result = await orderService.get(email);

    res.status(200).json({
      code: 200,
      data: result,
    });
  } catch (e) {
    next(e)
  }
}

const getById = async (req, res, next) => {
  try {
    const email = req.user.email;
    const orderId = req.params.orderId;
    const result = await orderService.getById(email, orderId);

    res.status(200).json({
      code: 200,
      data: result,
    });
  } catch (e) {
    next(e)
  }
}

const updateProfOfPayment = async (req, res, next) => {
  try {
    const email = req.user.email;
    const orderId = req.params.orderId;
    const file = req.files;
    const result = await orderService.updateProfOfPayment(email, orderId, file);

    res.status(200).json({
      code: 200,
      data: result,
    });
  } catch (e) {
    next(e);
  }
}

export default {
  create,
  get,
  getById,
  updateProfOfPayment
}

