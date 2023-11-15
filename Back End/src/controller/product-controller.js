import productService from "../service/product-service.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
    const files = req.files?.images;

    request.images = files;

    const result = await productService.create(request);

    res.status(200).json({
      code: 200,
      data: result
    });

  } catch (e) {
    next(e);
  }
}

const get = async (req, res, next) => {
  try {
    const request = req.query;
    const result = await productService.get(request);

    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (e) {
    next(e);
  }
}

export default {
  create,
  get
}