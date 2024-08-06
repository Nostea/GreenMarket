import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export async function addToCart({ userId, productId, quantity }) {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId, quantity }],
    });
  } else {
    const existingItemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }
  await cart.save();
  return cart;
}
