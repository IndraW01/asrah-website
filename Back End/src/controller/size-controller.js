import sizeService from "../service/size-service.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await sizeService.create(request);

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
    const result = await sizeService.get();

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
    const sizeId = req.params.sizeId;
    const result = await sizeService.getById(sizeId);

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
    const sizeId = req.params.sizeId;

    request.id = sizeId;

    const result = await sizeService.update(request);

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
    const sizeId = req.params.sizeId;

    await sizeService.destroy(sizeId);

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