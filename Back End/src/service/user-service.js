import { prisma } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validation } from "../validation/validation.js";
import { userGetValidation, userUpateValidation } from "../validation/user-validation.js";
import { imageValidation } from "../validation/utils/image-validation.js";
import path from "path";
import fs from "fs/promises";

const current = async (email) => {
  email = validation(userGetValidation, email);

  // Cek apakah user ada
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      name: true,
      email: true,
      image: true,
    }
  });

  if (!user) {
    throw new ResponseError(404, 'User not found');
  }

  return user;
}

const update = async (request, file, email) => {
  email = validation(userGetValidation, email)
  request = validation(userUpateValidation, request);

  // Cek apakah ada user
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (!user) {
    throw new ResponseError(404, "User not found");
  }

  // Validasi jika ada image
  if (file) {
    const image = file.image;
    const extension = path.extname(image.name);
    const mimeType = image.mimetype;
    const size = image.size;
    const imageObjectValidation = { extension, mimeType, size };
    validation(imageValidation, imageObjectValidation);
  }

  try {
    // Upload image
    if (file) {
      // Direktori image
      const pathIamge = process.cwd() + '/public/user/';
      const imageName = `${Date.now()}-${file.image.name}`;

      // Hapus image sebelumnya
      if (user.image) {
        console.log(pathIamge);
        fs.rm(pathIamge + user.image);
      }

      // Tambahkan data image ke request untuk diupdate
      request.image = imageName;

      // Upload image ke folder public
      file.image.mv(pathIamge + imageName)
    }

    return prisma.user.update({
      where: {
        email: user.email
      },
      data: request,
      select: {
        name: true,
        email: true,
        image: true
      }
    })
  } catch (e) {
    throw e;
  }

}

export default {
  current,
  update
}