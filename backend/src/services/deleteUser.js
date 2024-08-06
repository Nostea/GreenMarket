import User from "../models/User.js";

export async function deleteUser({ userId }) {
  console.log(`Deleting user with ID: ${userId}`);

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  await User.findByIdAndDelete(userId);

  console.log(`User with ID: ${userId} has been deleted`);

  return { message: "User deleted successfully" };
}
