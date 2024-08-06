import Favorite from "../models/Favourite.js";

export async function getFavorites(userId) {
  try {
    const favorites = await Favorite.findOne({ userId }).populate("products");
    return favorites.products;
  } catch (error) {
    throw new Error(`Error fetching favorites: ${error.message}`);
  }
}
