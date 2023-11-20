import addressService from "../service/address-service.js";

const create = async (req, res, next) => {
  try {
    const email = req.user.email;
    const request = req.body;
    const result = await addressService.create(request, email);

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
    const result = await addressService.get(email);

    res.status(200).json({
      code: 200,
      data: result
    })
  } catch (e) {
    next(e);
  }
}

const update = async (req, res, next) => {
  try {
    const email = req.user.email;
    const request = req.body;
    const addressId = req.params.addressId;

    request.id = addressId;

    const result = await addressService.update(request, email);

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
  update
}