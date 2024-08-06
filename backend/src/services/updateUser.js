import User from "../models/User.js";
import { userToView } from "./helpers.js";

export async function updateUser({ userId, updateData }) {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.isEmailVerified) {
    throw new Error("Email not verified");
  }

  delete updateData._id;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { ...updateData, updatedAt: Date.now() },
    { new: true, runValidators: true }
  );

  return userToView(updatedUser);
}
