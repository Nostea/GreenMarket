import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: {
      street: { type: String, required: true, trim: true },
      houseNumber: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      zip: { type: String, required: true, trim: true },
    },
    pwHash: { type: String, required: true, trim: true },
    pwSalt: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isEmailVerified: { type: Boolean, default: false },
    sixDigitCode: {
      type: String,
      required: true,
    },
  },
  { collection: "users", timestamps: true }
);

userSchema.pre("save", function () {
  const user = this;
  if (user.isModified("email")) {
    user.email = user.email.toLowerCase();
  }
});

userSchema.statics.findByEmail = function (email) {
  if (typeof email !== "string") return null;
  return this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model("User", userSchema);

export default User;
