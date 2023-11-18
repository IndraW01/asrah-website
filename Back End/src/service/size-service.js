import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { sizeCreateValidation, sizeGetValidation, sizeUpdateValidation } from "../validation/size-validation.js";
import { validation } from "../validation/validation.js"

const create = async (request) => {
  request = validation(sizeCreateValidation, request);

  return prisma.size.create({
    data: request,
    select: {
      name: true,
      description: true
    }
  });
}

const get = async () => {
  return prisma.size.findMany({
    select: {
      id: true,
      name: true,
      description: true
    },
    orderBy: {
      name: 'asc'
    }
  });
}

const getById = async (sizeId) => {
  sizeId = validation(sizeGetValidation, sizeId);

  const sizeExist = await prisma.size.count({
    where: {
      id: sizeId
    }
  });

  if (sizeExist !== 1) {
    throw new ResponseError(404, 'Size not found');
  }

  return prisma.size.findUnique({
    where: {
      id: sizeId
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  });
}

const update = async (request) => {
  request = validation(sizeUpdateValidation, request);

  const sizeExist = await prisma.size.count({
    where: {
      id: request.id
    }
  });

  if (sizeExist !== 1) {
    throw new ResponseError(404, 'Size not found');
  }

  return prisma.size.update({
    where: {
      id: request.id
    },
    data: {
      name: request.name,
      description: request.description
    },
    select: {
      name: true,
      description: true
    }
  });
}

const destroy = async (sizeId) => {
  sizeId = validation(sizeGetValidation, sizeId);

  const sizeExist = await prisma.size.count({
    where: {
      id: sizeId
    }
  });

  if (sizeExist !== 1) {
    throw new ResponseError(404, 'Size not found');
  }

  return prisma.size.delete({
    where: {
      id: sizeId
    }
  });
}

export default {
  create,
  get,
  getById,
  update,
  destroy
}