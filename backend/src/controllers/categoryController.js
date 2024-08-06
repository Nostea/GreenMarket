import { CategoriesService } from "../services/index.js";

async function getAllCategoriesCtrl(req, res) {
  try {
    const categories = await CategoriesService.getAllCategories();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not find all categories" });
  }
}

async function getOneCategoryCtrl(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const foundSingleCategory = await CategoriesService.getOneCategory(
      categoryId
    );
    res.json(foundSingleCategory);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: "Could not find category with id" + categoryId });
  }
}

async function postCreateCategoryCtrl(req, res) {
  try {
    const newCategory = req.body;
    const addedCategory = await CategoriesService.addCategory(newCategory);
    res.json(addedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not add new category" });
  }
}

async function deleteCategoryCtrl(req, res) {
  try {
    const categoryId = req.params.categoryId;
    const deletedCategory = await CategoriesService.deleteCategory(categoryId);
    res.json(deletedCategory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not delete category" });
  }
}

export const CategoryController = {
  getAllCategoriesCtrl,
  getOneCategoryCtrl,
  postCreateCategoryCtrl,
  deleteCategoryCtrl,
};
