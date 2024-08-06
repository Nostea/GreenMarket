import Cart from "../models/Cart.js";

export async function getCart(userId) {
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart) {
    throw new Error("Cart not found for this user");
  }

  return cart;
}
