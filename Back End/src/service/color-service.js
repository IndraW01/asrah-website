import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { colorCreateValidation, colorGetValidation, colorUpdateValidation } from "../validation/color-validation.js";
import { validation } from "../validation/validation.js"

const create = async (request) => {
  request = validation(colorCreateValidation, request);

  return prisma.color.create({
    data: request,
    select: {
      name: true,
      hexa: true
    }
  });
}

const get = async () => {
  return prisma.color.findMany({
    select: {
      name: true,
      hexa: true
    },
    orderBy: {
      name: 'asc'
    }
  });
}

const update = async (request) => {
  request = validation(colorUpdateValidation, request);

  const colorExist = await prisma.color.count({
    where: {
      id: request.id
    }
  });

  if (colorExist !== 1) {
    throw new ResponseError(404, 'Color not found');
  }

  return prisma.color.update({
    where: {
      id: request.id
    },
    data: {
      name: request.name,
      hexa: request.hexa
    },
    select: {
      name: true,
      hexa: true
    }
  });
}

const destroy = async (colorId) => {
  colorId = validation(colorGetValidation, colorId);

  const colorExist = await prisma.color.count({
    where: {
      id: colorId
    }
  });

  if (colorExist !== 1) {
    throw new ResponseError(404, 'Color not found');
  }

  return prisma.color.delete({
    where: {
      id: colorId
    }
  });
}

export default {
  create,
  update,
  get,
  destroy
}