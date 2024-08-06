import Category from "../models/Category.js";

export async function getAllCategories() {
  const categories = await Category.find({});
  if (!categories) throw new Error("Categories not found");
  return categories;
}
