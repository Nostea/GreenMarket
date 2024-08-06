import Cart from "../models/Cart.js";

export async function updateCartItemQuantity(userId, productId, quantity) {
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      throw new Error("Cart not found");
    }

    const cartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!cartItem) {
      throw new Error("Product not found in cart");
    }

    cartItem.quantity = quantity;

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(`Error updating cart item quantity: ${error.message}`);
  }
}
