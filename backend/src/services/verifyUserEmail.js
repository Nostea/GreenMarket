import User from "../models/User.js";

export async function verifyUserEmail({ userId, sixDigitCode }) {
  const user = await User.findById({ _id: userId });
  if (!user) throw new Error("User not found");

  const codeMatched = user.sixDigitCode === sixDigitCode;
  if (!codeMatched) throw new Error("Invalid six digit code, please try again");

  user.isEmailVerified = true;
  await user.save();

  return { message: "You are now verified" };
}
