import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { cartCreateValidation, cartIdValidation } from "../validation/cart-validation.js";
import { validation } from "../validation/validation.js";

const create = async (request, email) => {
  request = validation(cartCreateValidation, request);

  // Cek apakah data relasinya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  const product = await prisma.product.findUnique({
    where: {
      id: request.product_id
    }
  });
  const color = await prisma.color.findUnique({
    where: {
      id: request.color_id
    }
  });
  const size = await prisma.size.findUnique({
    where: {
      id: request.size_id
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  } else if (!product) {
    throw new ResponseError(404, 'Product not found');
  } else if (!color) {
    throw new ResponseError(404, 'Color not found');
  } else if (!size) {
    throw new ResponseError(404, 'Size not found');
  }

  // Tambahkan user id
  request.user_id = user.id;

  // Cek apakah sudah ditambahkan ke keranjang
  const cart = await prisma.cart.findFirst({
    where: {
      user_id: request.user_id,
      product_id: request.product_id,
      color_id: request.color_id,
      size_id: request.size_id,
    }
  });

  if (cart) {
    return prisma.cart.update({
      where: {
        id: cart.id
      },
      data: {
        quantity: cart.quantity + 1
      },
      select: {
        user: {
          select: {
            name: true
          }
        },
        product: {
          select: {
            name: true,
            price: true
          }
        },
        color: {
          select: {
            name: true
          }
        },
        size: {
          select: {
            name: true
          }
        },
        quantity: true
      }
    })
  }

  return prisma.cart.create({
    data: request,
    select: {
      user: {
        select: {
          name: true
        }
      },
      product: {
        select: {
          name: true,
          price: true
        }
      },
      color: {
        select: {
          name: true
        }
      },
      size: {
        select: {
          name: true
        }
      },
      quantity: true
    }
  });
}

const get = async (email) => {
  // Cek product berdasarkan usernya
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Ambil data product dari user login
  return prisma.cart.findMany({
    where: {
      user: {
        id: user.id
      }
    },
    select: {
      id: true,
      product: {
        select: {
          id: true,
          name: true,
          price: true
        }
      },
      color: {
        select: {
          id: true,
          name: true
        }
      },
      size: {
        select: {
          id: true,
          name: true
        }
      },
      quantity: true,
    },
    orderBy: {
      created_cart: 'asc'
    }
  });
}

const incrementQuantity = async (cartId) => {
  cartId = validation(cartIdValidation, cartId);

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId
    }
  });

  if (!cart) {
    throw new ResponseError(404, 'Cart not found');
  }

  await prisma.cart.update({
    where: {
      id: cartId
    },
    data: {
      quantity: cart.quantity + 1
    }
  })

  return 'Quantity added'
}

const decrementQuantity = async (cartId) => {
  cartId = validation(cartIdValidation, cartId);

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId
    }
  });

  if (!cart) {
    throw new ResponseError(404, 'Cart not found');
  }

  if (cart.quantity == 1) {
    return 'Minimum quantity 1'
  }

  await prisma.cart.update({
    where: {
      id: cartId
    },
    data: {
      quantity: cart.quantity - 1
    }
  })

  return 'Quantity reduced';
}

const destroy = async (cartId) => {
  cartId = validation(cartIdValidation, cartId);

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId
    }
  });

  if (!cart) {
    throw new ResponseError(404, 'Cart not found');
  }

  await prisma.cart.delete({
    where: {
      id: cartId
    }
  })

  return 'Product has been successfully deleted';
}

export default {
  create,
  get,
  incrementQuantity,
  decrementQuantity,
  destroy
}