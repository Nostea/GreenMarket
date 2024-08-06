export function userToView(user) {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    address: user.address,
    isEmailVerified: user.isEmailVerified,
  };
}
