import User from "../models/User.js";
import { userToView } from "./helpers.js";

export async function getUserById({ userId }) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return userToView(user);
}
