import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { addressCreateValidation, addressGetValidation, addressUpdateValidation } from "../validation/address-validation.js";
import { validation } from "../validation/validation.js"

const create = async (request, email) => {
  request = validation(addressCreateValidation, request);

  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Create address
  return prisma.address.create({
    data: {
      user_id: user.id,
      ...request
    },
    select: {
      address_name: true,
      province: true,
      city: true,
      subdistrict: true,
      road: true
    }
  });
}

const get = async (email) => {
  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Get addresses
  return prisma.address.findMany({
    where: {
      user_id: user.id
    },
    select: {
      id: true,
      address_name: true,
      province: true,
      city: true,
      subdistrict: true,
      road: true
    }
  });
}

const getById = async (addressId, email) => {
  addressId = validation(addressGetValidation, addressId);

  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Cek apakah address nya ada
  const address = await prisma.address.findUnique({
    where: {
      id: addressId,
      user_id: user.id
    }
  })

  if (!address) {
    throw new ResponseError(404, 'Address not found');
  }

  return address;
}

const update = async (request, email) => {
  request = validation(addressUpdateValidation, request);

  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Cek apakah addressnya ada
  const address = await prisma.address.findUnique({
    where: {
      id: request.id
    }
  })

  if (!address) {
    throw new ResponseError(404, 'Address not found');
  }

  // Update addressnya
  delete request.id;

  return prisma.address.update({
    where: {
      id: address.id
    },
    data: request
  })
}

export default {
  create,
  get,
  update,
  getById
}