import Product from "../models/Product.js";

export async function getProductById(productId) {
  try {
    const product = await Product.findById(productId).populate("categoryId");
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  } catch (error) {
    throw new Error("Error fetching product: " + error.message);
  }
}
