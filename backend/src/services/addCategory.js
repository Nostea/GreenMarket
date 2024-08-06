import Category from "../models/Category.js";

export async function addCategory(categoryInfo) {
  const foundCategory = await Category.findOne({ name: categoryInfo.name });
  if (foundCategory) throw new Error("Category with this name already exists");
  return Category.create(categoryInfo);
}
