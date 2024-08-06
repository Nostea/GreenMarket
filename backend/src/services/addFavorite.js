import Favorite from "../models/Favourite.js";

export async function addFavorite(userId, productId) {
  let favorite = await Favorite.findOne({ userId });

  if (!favorite) {
    favorite = new Favorite({ userId, products: [productId] });
  } else {
    if (favorite.products.includes(productId)) {
      throw new Error("Product is already in the favorites");
    }

    favorite.products.push(productId);
  }

  await favorite.save();
  return favorite;
}
