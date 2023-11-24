import cartService from "../service/cart-service.js";

const create = async (req, res, next) => {
  try {
    const email = req.user.email;
    const request = req.body;
    const result = await cartService.create(request, email);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const get = async (req, res, next) => {
  try {
    const email = req.user.email;
    const result = await cartService.get(email);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const incrementQuantity = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const result = await cartService.incrementQuantity(cartId);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const decrementQuantity = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const result = await cartService.decrementQuantity(cartId);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const destroy = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const result = await cartService.destroy(cartId);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e);
  }
}

export default {
  create,
  get,
  incrementQuantity,
  decrementQuantity,
  destroy
}