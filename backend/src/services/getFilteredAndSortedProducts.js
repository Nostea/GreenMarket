import Category from "../models/Category.js";
import Product from "../models/Product.js";

export async function getFilteredAndSortedProducts({
  minPrice,
  maxPrice,
  categoryName,
  sortBy,
}) {
  try {
    const filterCriteria = {};

     if (minPrice !== undefined || maxPrice !== undefined) {
       filterCriteria.price = {};
       if (minPrice !== undefined) {
         filterCriteria.price.$gte = minPrice;
       }
       if (maxPrice !== undefined) {
         filterCriteria.price.$lte = maxPrice;
       }
     }

    if (categoryName) {
      const category = await Category.findOne({ name: categoryName });
      if (category) {
        filterCriteria.categoryId = category._id;
      } else {
        return [];
      }
    }

    let sortCriteria = {};
    if (sortBy === "Lowest") {
      sortCriteria.price = 1;
    } else if (sortBy === "Highest") {
      sortCriteria.price = -1;
    } else if (sortBy === "Best") {
      sortCriteria.rating = -1;
    }


    const products = await Product.find(filterCriteria)
      .sort(sortCriteria)
      .populate("categoryId");
    return products;
  } catch (error) {
    throw new Error(
      "Error fetching filtered and sorted products: " + error.message
    );
  }
}
