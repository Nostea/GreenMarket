import express from "express";
import { CategoryController } from "../controllers/categoryController.js";

export const categoryRouter = express
  .Router()
  .get("/", CategoryController.getAllCategoriesCtrl)
  .get("/:categoryId", CategoryController.getOneCategoryCtrl)
  .post("/", CategoryController.postCreateCategoryCtrl)
  .delete("/:categoryId", CategoryController.deleteCategoryCtrl);
