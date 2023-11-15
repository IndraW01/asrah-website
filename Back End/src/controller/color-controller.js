import colorService from "../service/color-service.js";

const create = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await colorService.create(request);

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
    const result = await colorService.get();

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
    const colorId = req.params.colorId;

    request.id = colorId;

    const result = await colorService.update(request);

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
    const colorId = req.params.colorId;

    await colorService.destroy(colorId);

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
  update,
  get,
  destroy
}