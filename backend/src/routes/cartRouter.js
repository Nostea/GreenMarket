import express from "express";
import { CartController } from "../controllers/cartController.js";
import { doJwtAuth } from "../../middlewares/doJwtAuth.js";

export const cartRouter = express
  .Router()
  .post("/addToCart", doJwtAuth, CartController.postAddToCartCtrl)
  .post("/addMealOfTheDay", doJwtAuth, CartController.postAddMealOfTheDayCtrl)
  .delete("/removeItem", doJwtAuth, CartController.postRemoveItemFromCartCtrl)
  .patch(
    "/updateQuantity/:productId",
    doJwtAuth,
    CartController.updateCartItemQuantityCtrl
  )
  .get("/getCart", doJwtAuth, CartController.getCartCtrl);
