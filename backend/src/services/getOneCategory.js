import Category from "../models/Category.js";

export async function getOneCategory(categoryId) {
  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category with id" + categoryId + "not found");
  return category;
}
