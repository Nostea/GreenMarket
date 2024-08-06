import Product from "../models/Product.js";

export async function getAllProducts() {
  try {
    const products = await Product.find().populate("categoryId");
    return products;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}
