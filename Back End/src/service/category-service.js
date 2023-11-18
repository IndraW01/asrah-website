import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { categoryCreateValidation, categoryGetValidation, categoryUpdateValidation } from "../validation/category-validation.js"
import { validation } from "../validation/validation.js"

const create = async (request) => {
  request = validation(categoryCreateValidation, request);

  return prisma.category.create({
    data: request,
    select: {
      name: true,
      description: true
    }
  });
}

const get = async () => {
  return prisma.category.findMany({
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

const getById = async (categoryId) => {
  categoryId = validation(categoryGetValidation, categoryId);

  const categoryExist = await prisma.category.count({
    where: {
      id: categoryId
    }
  });

  if (categoryExist !== 1) {
    throw new ResponseError(404, 'Category not found');
  }

  return prisma.category.findUnique({
    where: {
      id: categoryId
    },
    select: {
      id: true,
      name: true,
      description: true
    }
  });
}

const update = async (request) => {
  request = validation(categoryUpdateValidation, request);

  const categoryExist = await prisma.category.count({
    where: {
      id: request.id
    }
  });

  if (categoryExist !== 1) {
    throw new ResponseError(404, 'Category not found');
  }

  return prisma.category.update({
    where: {
      id: request.id
    },
    data: request,
    select: {
      name: true,
      description: true
    }
  });
}

const destroy = async (categoryId) => {
  categoryId = validation(categoryGetValidation, categoryId);

  const categoryExist = await prisma.category.count({
    where: {
      id: categoryId
    }
  });

  if (categoryExist !== 1) {
    throw new ResponseError(404, 'Category not found');
  }

  return prisma.category.delete({
    where: {
      id: categoryId
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