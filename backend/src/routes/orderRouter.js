import express from "express";
import { doJwtAuth } from "../../middlewares/doJwtAuth.js";
import { OrderController } from "../controllers/orderController.js";

export const orderRouter = express
  .Router()
  .get("/orderByUser", doJwtAuth, OrderController.getUserOrdersCtrl)
  .post("/addOrder", doJwtAuth, OrderController.postAddOrderCtrl);
