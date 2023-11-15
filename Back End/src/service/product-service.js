import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { productCreateValidation, productGetValidation } from "../validation/product-validation.js";
import { imageValidation, imageValidations } from "../validation/utils/image-validation.js";
import { validation } from "../validation/validation.js";
import path from "path";
import fs from "fs/promises";

const create = async (request) => {
  request = validation(productCreateValidation, request);

  // Ubah menjadi array
  if (typeof request.colors === 'string') {
    request.colors = [request.colors];
  }

  // Cek apakah user mengirim satu foto atau lebih, setelah itu validasi fotonya
  const images = request.images;
  if (Array.isArray(images)) {
    const imageObjectValidations = images.map(image => {
      return {
        extension: path.extname(image.name),
        mimeType: image.mimetype,
        size: image.size
      }
    })
    validation(imageValidations, imageObjectValidations);
  } else {
    const extension = path.extname(images.name);
    const mimeType = images.mimetype;
    const size = images.size;
    const imageObjectValidation = { extension, mimeType, size };
    validation(imageValidation, imageObjectValidation);
  }

  // Cek apakah color nya ada atau tidak
  const colorIds = request.colors;
  const colors = await prisma.color.findMany({
    where: {
      id: {
        in: colorIds
      }
    }
  });

  if (colorIds.length !== colors.length) {
    throw new ResponseError(404, 'One Color not found');
  }

  // Direktori image
  const pathIamge = process.cwd() + '/public/product/';

  // Simpan nama fotonya
  const imageNameSave = [];

  // upload foto dan create productnyaa
  try {
    // Upload foto 
    if (Array.isArray(images)) {
      images.forEach(image => {
        const imageName = `${Date.now()}-${image.name}`;

        // Tambah name imagenya
        imageNameSave.push({ image: imageName });

        // Upload image ke folder public
        image.mv(pathIamge + imageName)
      });

    } else {
      const imageName = `${Date.now()}-${images.name}`;

      // Tambah name imagenya
      imageNameSave.push({ image: imageName });

      // Upload image ke folder public
      images.mv(pathIamge + imageName)
    }

    // create productnya
    const product = await prisma.product.create({
      data: {
        name: request.name,
        gender_category: request.gender_category,
        price: request.price,
        description: request.description,
        imageProducts: {
          createMany: {
            data: imageNameSave
          }
        },
        colors: {
          create: colorIds.map(colorId => ({
            color: {
              connect: {
                id: colorId
              }
            }
          }))
        }
      },
      select: {
        name: true,
        gender_category: true,
        price: true,
        description: true,
        imageProducts: {
          select: {
            image: true
          }
        },
        colors: {
          select: {
            color: {
              select: {
                name: true,
                hexa: true
              }
            }
          }
        }
      }
    });

    return product
  } catch (e) {
    // Hapus foto jika ada kegagalan request diatas
    imageNameSave.forEach(image => {
      fs.rm(pathIamge + image.image);
    })

    throw e;
  }
};

const get = async (request) => {
  request = validation(productGetValidation, request);

  const filter = [];

  if (request.gender_category) {
    filter.push({
      gender_category: request.gender_category
    });
  }
  if (request.name) {
    filter.push({
      name: {
        contains: request.name
      }
    });
  }

  // Ambil jumlah product
  const productCount = await prisma.product.count({
    where: {
      AND: filter
    },
    take: request.take
  })

  const products = await prisma.product.findMany({
    where: {
      AND: filter
    },
    select: {
      name: true,
      gender_category: true,
      price: true,
      description: true,
      imageProducts: {
        select: {
          image: true
        }
      },
      colors: {
        select: {
          color: {
            select: {
              name: true,
              hexa: true
            }
          }
        }
      },
      _count: {
        select: {
          imageProducts: true,
          colors: true
        }
      },
    },
    orderBy: {
      name: 'asc'
    },
    take: request.take
  });

  products.push({ productTotal: productCount });

  return products
}

export default {
  create,
  get
}