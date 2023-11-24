import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { orderCreateValidation, orderGetValidation, orderUpdateProfOfPayment } from "../validation/order-validation.js";
import { fileProfOfPaymentValidation } from "../validation/utils/image-validation.js";
import { validation } from "../validation/validation.js";
import path from "path";
import fs from "fs/promises";

const create = async (request, email) => {
  request = validation(orderCreateValidation, request);

  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Cek apakah cart nya ada
  const carts = await prisma.cart.findMany({
    where: {
      user_id: user.id
    },
    select: {
      product: {
        select: {
          id: true
        }
      },
      color: {
        select: {
          id: true
        }
      },
      size: {
        select: {
          id: true
        }
      },
      quantity: true
    }
  });

  if (carts.length == 0) {
    throw new ResponseError(404, 'Cart not found');
  }

  try {
    const order = await prisma.$transaction(async (prismaClient) => {
      // Create personal information
      const personalInformation = await prismaClient.personalInformation.create({
        data: {
          name: request.name,
          email: request.email,
          phone_number: request.phone_number,
        }
      });

      // Create order
      const orderCreate = await prismaClient.order.create({
        data: {
          user_id: user.id,
          personal_id: personalInformation.id,
          address_id: request.address_id,
          price: request.price,
          shipping_method: request.shipping_method,
          shipping: request.shipping,
          orderDetails: {
            create: carts.map(cart => {
              return {
                product_id: cart.product.id,
                color_id: cart.color.id,
                size_id: cart.size.id,
                quantity: cart.quantity,
              }
            })
          }
        },
        select: {
          id: true,
          orderDetails: {
            select: {
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
          },
          shipping: true,
          order_date: true,
          price: true
        }
      });

      // Hapus Cart dari user
      await prismaClient.cart.deleteMany({
        where: {
          user_id: user.id
        }
      });

      return orderCreate;
    });

    return order;
  } catch (e) {
    throw e;
  }
}

const get = async (email) => {
  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Ambil semua data ordernya
  return prisma.order.findMany({
    where: {
      user_id: user.id
    },
    select: {
      id: true,
      orderDetails: {
        select: {
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
      },
      status: true,
      shipping: true,
      order_date: true,
      price: true
    },
    orderBy: {
      order_date: 'asc'
    }
  });
}

const getById = async (email, orderId) => {
  orderId = validation(orderGetValidation, orderId);

  // Cek apakah ordernya ada
  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    }
  });

  if (!order) {
    throw new ResponseError(404, 'Order not found');
  }

  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Ambil data ordernya
  return prisma.order.findFirst({
    where: {
      id: orderId,
      user_id: user.id,
    },
    select: {
      id: true,
      personal: {
        select: {
          name: true
        }
      },
      address: {
        select: {
          address_name: true,
          province: true,
          city: true,
          subdistrict: true,
          road: true
        }
      },
      orderDetails: {
        select: {
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
      },
      status: true,
      shipping_method: true,
      shipping: true,
      order_date: true,
      price: true,
      no_resi: true,
      prof_of_payment: true
    },
    orderBy: {
      order_date: 'asc'
    }
  });
}

const updateProfOfPayment = async (email, orderId, file) => {
  file = validation(orderUpdateProfOfPayment, file);

  // Cek apakah ordernya ada
  const order = await prisma.order.findUnique({
    where: {
      id: orderId
    }
  });

  if (!order) {
    throw new ResponseError(404, 'Order not found');
  }

  // Cek apakah usernya ada
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  // Jika sudah upload bukti
  if (order.prof_of_payment) {
    throw new ResponseError(400, 'You have uploaded proof of payment');
  }

  // Validasi file
  const profOfPayment = file.prof_of_payment;
  const extension = path.extname(profOfPayment.name);
  const mimeType = profOfPayment.mimetype;
  const size = profOfPayment.size;
  const fileObjectValidation = { extension, mimeType, size };
  validation(fileProfOfPaymentValidation, fileObjectValidation);

  // Direktori File
  const pathFile = process.cwd() + '/public/order/';
  const fileName = `${Date.now()}-${profOfPayment.name}`

  try {
    // Upload foto
    await profOfPayment.mv(pathFile + fileName);

    // Update profOfPayment dan status
    await prisma.order.update({
      where: {
        id: order.id,
        user_id: user.id
      },
      data: {
        prof_of_payment: fileName,
        status: 'Sudah Upload'
      }
    });

    return 'Upload proof of successful payment'
  } catch (e) {
    // Hapus foto jika ada error
    await fs.rm(pathFile + fileName);

    throw e;
  }
};

export default {
  create,
  get,
  getById,
  updateProfOfPayment
}