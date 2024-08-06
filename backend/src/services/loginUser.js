import { createToken } from "../../utils/createToken.js";
import { hash } from "../../utils/hash.js";
import User from "../models/User.js";
import { userToView } from "./helpers.js";

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid login");

  const pwHash = hash(`${password}${user.pwSalt}`);
  const correctPassword = pwHash === user.pwHash;
  if (!correctPassword) throw new Error("Invalid login");

  const accessToken = createToken(user, "access");
  const refreshToken = createToken(user, "refresh");
  return {
    user: userToView(user),
    tokens: { accessToken, refreshToken },
  };
}
