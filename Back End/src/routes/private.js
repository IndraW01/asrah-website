import express from "express";
import userController from "../controller/user-controller.js";
import authController from "../controller/auth-controller.js";
// import categoryController from "../controller/category-controller.js";
import sizeController from "../controller/size-controller.js";
import colorController from "../controller/color-controller.js";
import productController from "../controller/product-controller.js";
import addressController from "../controller/address-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import { roleMiddleware } from "../middleware/role-middleware.js";

export const privateApi = express.Router();

privateApi.use(authMiddleware);

// Route Users
privateApi.get("/api/users/current", userController.current)
privateApi.put("/api/users/current", userController.update);

// Route auth
privateApi.delete("/auth/logout", authController.logout)
privateApi.post("/auth/resend/verify-email", authController.resend)

// Route categories
// privateApi.post('/api/categories', roleMiddleware(true), categoryController.create);
// privateApi.get('/api/categories', categoryController.get);
// privateApi.get('/api/categories/:categoryId', categoryController.getById);
// privateApi.patch('/api/categories/:categoryId', roleMiddleware(true), categoryController.update);
// privateApi.delete('/api/categories/:categoryId', roleMiddleware(true), categoryController.destroy);

// Route sizes
privateApi.post('/api/sizes', roleMiddleware(true), sizeController.create);
privateApi.get('/api/sizes', sizeController.get);
privateApi.get('/api/sizes/:sizeId', sizeController.getById);
privateApi.patch('/api/sizes/:sizeId', roleMiddleware(true), sizeController.update);
privateApi.delete('/api/sizes/:sizeId', roleMiddleware(true), sizeController.destroy);

// Route colors
privateApi.post('/api/colors', roleMiddleware(true), colorController.create);
privateApi.get('/api/colors', colorController.get);
privateApi.get('/api/colors/:colorId', colorController.getById);
privateApi.patch('/api/colors/:colorId', roleMiddleware(true), colorController.update);
privateApi.delete('/api/colors/:colorId', roleMiddleware(true), colorController.destroy);

// Route products
privateApi.post('/api/products', roleMiddleware(true), productController.create);
privateApi.get('/api/products', productController.get);
privateApi.get('/api/products/:productId', productController.getById);
privateApi.patch('/api/products/:productId', roleMiddleware(true), productController.update);


privateApi.post('/api/addresses', addressController.create);
privateApi.get('/api/addresses', addressController.get);
privateApi.patch('/api/addresses/:addressId', addressController.update);