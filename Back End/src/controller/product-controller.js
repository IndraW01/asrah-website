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

const getById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const result = await productService.getById(productId);

    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const update = async (req, res, next) => {
  try {
    const request = req.body;
    const productId = req.params.productId;

    request.id = productId;

    // const files = req.files?.images;

    // request.images = files;

    const result = await productService.update(request);

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
  get,
  getById,
  update
}