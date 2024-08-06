import Category from "../models/Category.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";
export async function addProduct({
  name,
  ratingAmount,
  image,
  categoryId,
  price,
  rating,
  unit,
}) {
  const foundProduct = await Product.findOne({ name });
  if (foundProduct) throw new Error("Product with this name already exists");

  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found.");
  }

  const id = new mongoose.Types.ObjectId(categoryId);

  const product = await Product.create({
    name,
    ratingAmount,
    image,
    categoryId: id,
    price,
    rating,
    unit,
  });

  const populatedProduct = await Product.findById(product._id).populate(
    "categoryId"
  );

  return populatedProduct;
}
