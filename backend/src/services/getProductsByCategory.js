import Product from "../models/Product.js";

export async function getProductsByCategory(categoryId) {
  const products = await Product.find({ categoryId: categoryId }).populate(
    "categoryId"
  );

  return products;
}
