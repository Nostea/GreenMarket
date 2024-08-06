import { createToken } from "../../utils/createToken.js";
import User from "../models/User.js";
import { userToView } from "./helpers.js";

export async function refreshToken(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  const newAccessToken = createToken(user, "access");
  return { newAccessToken, user: userToView(user) };
}
