import Order from "../models/Order.js";

import Cart from "../models/Cart.js";

export async function addOrder(userId) {
  try {
    const cartItems = await Cart.findOne({ userId }).populate(
      "items.productId"
    );

    if (!cartItems) {
      throw new Error("Cart not found");
    }

    const products = cartItems.items.map((item) => {
      const product = item.productId;
      const quantity = item.quantity;
      const price = product.price;
      const name = product.name;

      return {
        product: product._id.toString(),
        quantity,
        price,
        name,
      };
    });

    let totalAmount = 0;
    products.forEach((product) => {
      totalAmount += product.price * product.quantity;
    });

    const newOrder = await Order.create({
      user: userId,
      products,
      totalAmount,
      orderStatus: "processing",
      paymentStatus: "unpaid",
    });

    await Cart.deleteOne({ userId });

    return {
      order: newOrder,
      totalAmount,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
