import { addProduct } from "./addProduct.js";
import { deleteUser } from "./deleteUser.js";
import { getAllProducts } from "./getAllProducts.js";
import { getProductById } from "./getProductById.js";

import { addCategory } from "./addCategory.js";
import { deleteCategory } from "./deleteCategory.js";
import { getAllCategories } from "./getAllCategories.js";
import { getOneCategory } from "./getOneCategory.js";

import { getUserById } from "./getUserById.js";
import { loginUser } from "./loginUser.js";
import { refreshToken } from "./refreshToken.js";
import { registerUser } from "./registerUser.js";
import { updateProduct } from "./updateProduct.js";
import { updateUser } from "./updateUser.js";
import { verifyUserEmail } from "./verifyUserEmail.js";
import { searchProductsByName } from "./searchProductsByName.js";
import { getFilteredAndSortedProducts } from "./getFilteredAndSortedProducts.js";
import { addToCart } from "./addToCart.js";
import { removeItemFromCart } from "./removeItemFromCart.js";
import { getCart } from "./getCart.js";
import { getProductsByCategory } from "./getProductsByCategory.js";
import { addFavorite } from "./addFavorite.js";
import { removeFavorite } from "./removeFavorite.js";
import { getFavorites } from "./getFavorites.js";
import { updateCartItemQuantity } from "./updateCartItemQuantity.js";
import { addOrder } from "./addOrder.js";
import { getOrdersByUser } from "./getOrdersByUsers.js";
import { addMealOfTheDay } from "./addMealOfTheDay.js";

export const UserService = {
  registerUser,
  loginUser,
  refreshToken,
  updateUser,
  deleteUser,
  verifyUserEmail,
  getUserById,
};

export const ProductService = {
  addProduct,
  updateProduct,
  getAllProducts,
  getProductById,
  searchProductsByName,
  getFilteredAndSortedProducts,
  getProductsByCategory,
};

export const CategoriesService = {
  getAllCategories,
  getOneCategory,
  addCategory,
  deleteCategory,
};

export const CartService = {
  addToCart,
  removeItemFromCart,
  getCart,
  updateCartItemQuantity,
  addMealOfTheDay,
};

export const FavoriteService = {
  addFavorite,
  removeFavorite,
  getFavorites,
};

export const OrderService = {
  addOrder,
  getOrdersByUser,
};
