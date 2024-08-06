import { ProductService } from "../services/index.js";

export async function postCreateProductCtrl(req, res) {
  try {
    const { name, ratingAmount, image, categoryId, price, rating, unit } =
      req.body;

    const result = await ProductService.addProduct({
      name,
      ratingAmount,
      image,
      categoryId,
      price,
      rating,
      unit,
    });

    res.status(201).json({ result });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
}

export async function updateProductCtrl(req, res) {
  const { productId } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await ProductService.updateProduct(
      productId,
      updateData
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error while updating product." });
  }
}

export async function getAllProductsCtrl(req, res) {
  try {
    const products = await ProductService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error while fetching products." });
  }
}

export async function getProductByIdCtrl(req, res) {
  const { productId } = req.params;
  try {
    const product = await ProductService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error while fetching product." });
  }
}

export async function getProductsByNameCtrl(req, res) {
  const { name } = req.params;
  try {
    const products = await ProductService.searchProductsByName(name);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error searching for products:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error while searching for products." });
  }
}

export async function getFilteredAndSortedProductsCtrl(req, res) {
  const { minPrice, maxPrice, categoryName, sortBy } = req.query;

  try {
    const products = await ProductService.getFilteredAndSortedProducts({
      minPrice: minPrice !== undefined ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice !== undefined ? parseFloat(maxPrice) : undefined,
      categoryName,
      sortBy,
    });
    res.status(200).json(products);
  } catch (error) {
    console.error(
      "Error fetching filtered and sorted products:",
      error.message
    );
    res.status(500).json({
      error:
        "Internal server error while fetching filtered and sorted products.",
    });
  }
}

export async function getProductsByCategoryCtrl(req, res) {
  try {
    const categoryId = req.params.categoryId;

    if (!categoryId) {
      return res.status(400).json({ message: "categoryId is required" });
    }

    const products = await ProductService.getProductsByCategory(categoryId);
    res.json(products);
  } catch (err) {
    console.log("Error fetching products by category:", err);
    res.status(500).json({ err, message: err.message });
  }
}

export const ProductController = {
  postCreateProductCtrl,
  updateProductCtrl,
  getAllProductsCtrl,
  getProductByIdCtrl,
  getProductsByNameCtrl,
  getFilteredAndSortedProductsCtrl,
  getProductsByCategoryCtrl,
};
