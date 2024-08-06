import Product from "../models/Product.js";

export async function updateProduct(productId, updateData) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    ).populate("categoryId");

    if (!updatedProduct) {
      throw new Error("Product not found.");
    }

    return updatedProduct;
  } catch (error) {
    throw new Error("Error updating product: " + error.message);
  }
}
