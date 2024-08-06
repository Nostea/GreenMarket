import Category from "../models/Category.js";

export async function deleteCategory(categoryId) {
  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");

  await Category.findByIdAndDelete(categoryId);
  return { message: "Category successfully deleted" };
}
