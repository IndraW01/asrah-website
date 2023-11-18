import categoryService from "../service/category-service.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await categoryService.create(request);

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
    const result = await categoryService.get();

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
    const categoryId = req.params.categoryId;
    const result = await categoryService.getById(categoryId);

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
    const categoryId = req.params.categoryId;

    request.id = categoryId;

    const result = await categoryService.update(request);

    res.status(200).json({
      code: 200,
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const destroy = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;

    await categoryService.destroy(categoryId);

    res.status(200).json({
      code: 200,
      data: 'OK'
    });
  } catch (e) {
    next(e);
  }
}

export default {
  create,
  get,
  getById,
  update,
  destroy
}