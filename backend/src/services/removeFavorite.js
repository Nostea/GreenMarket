import Favorite from "../models/Favourite.js";

export async function removeFavorite(userId, productId) {
  let favorite = await Favorite.findOne({ userId });

  if (!favorite) {
    throw new Error("No favorites found for the user");
  }

  favorite.products = favorite.products.filter(
    (id) => id.toString() !== productId.toString()
  );

  await favorite.save();
  return favorite;
}
