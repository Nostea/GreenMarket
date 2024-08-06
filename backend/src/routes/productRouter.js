import express from "express";
import { ProductController } from "../controllers/productController.js";

export const productRouter = express
  .Router()
  .post("/newProduct", ProductController.postCreateProductCtrl)
  .get("/getAllProducts", ProductController.getAllProductsCtrl)
  .get(
    "/getFilteredAndSortedProducts",
    ProductController.getFilteredAndSortedProductsCtrl
  )
  .patch("/updateProduct/:productId", ProductController.updateProductCtrl)
  .get(
    "/getProductByCategory/:categoryId",
    ProductController.getProductsByCategoryCtrl
  )
  .get("/getProductsByName/:name", ProductController.getProductsByNameCtrl)
  .get("/getProductById/:productId", ProductController.getProductByIdCtrl);
