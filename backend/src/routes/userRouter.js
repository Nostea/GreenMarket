import express from "express";
import { UserController } from "../controllers/userController.js";
import {
  doJwtAuth,
  validateRefreshTokenInCookieSession,
} from "../../middlewares/doJwtAuth.js";

export const userRouter = express
  .Router()

  .post("/register", UserController.postRegisterUserCtrl)
  .post("/login", UserController.postLoginUserCtrl)
  .post("/logout", UserController.handleLogout)
  .post("/verifyEmail/:userId", UserController.postVerifyEmailCtrl)
  .patch("/updateUser", doJwtAuth, UserController.patchUpdateUserCtrl)
  .get("/userById", doJwtAuth, UserController.getUserByIdCtrl)
  .delete("/deleteUser", doJwtAuth, UserController.deleteUserCtrl)
  .post(
    "/refresh-token",
    validateRefreshTokenInCookieSession,
    UserController.postRefreshToken
  );
