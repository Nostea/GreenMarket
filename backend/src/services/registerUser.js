import { generateRandomSalt, hash } from "../../utils/hash.js";
import { sendEmail } from "../../utils/sendEmail.js";
import { generateRandomSixDigitCode } from "../../utils/sixDigitCode.js";
import User from "../models/User.js";
import { userToView } from "./helpers.js";

export async function registerUser({
  email,
  address,
  firstName,
  lastName,
  password,
}) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new Error("User with this email already has an account");
    }
    if (existingUser.username === username) {
      throw new Error("User with this username already has an account");
    }
  }

  const pwSalt = generateRandomSalt();
  const pwHash = hash(`${password}${pwSalt}`);

  const sixDigitCode = generateRandomSixDigitCode();

  const user = await User.create({
    firstName,
    lastName,
    email,
    address,
    pwHash,
    pwSalt,
    isEmailVerified: false,
    sixDigitCode,
  });

  await sendEmailVerification(user);

  return userToView(user);
}

async function sendEmailVerification(user) {
  return sendEmail({
    to: user.email,
    subject: "Welcome to GreenMarket",
    text: `Hi ${user.firstName},
      welcome to GreenMarket 🎉!!!
      Please enter the below six-digit-code and your email. 
      ${user.sixDigitCode}
      ${user.email}
      See you on the green side :)
      - Adrian from GreenMarket
      `,
  });
}
