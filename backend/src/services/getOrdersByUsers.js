import Order from "../models/Order.js";

export async function getOrdersByUser(userId) {
  try {
    const orders = await Order.find({ user: userId }).populate(
      "products.product"
    );

    if (!orders) {
      throw new Error("No orders found for this user");
    }

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
