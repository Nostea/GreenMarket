import { FavoriteService } from "../services/index.js";

export async function addFavoriteCtrl(req, res) {
  const productId = req.body.productId;
  const userId = req.authenticatedUserId;
  try {
    const result = await FavoriteService.addFavorite(userId, productId);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error adding favorite:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error while adding favorite." });
  }
}

export async function removeFavoriteCtrl(req, res) {
  const productId = req.body.productId;
  const userId = req.authenticatedUserId;

  try {
    const result = await FavoriteService.removeFavorite(userId, productId);
    res
      .status(200)
      .json(result);
  } catch (error) {
    console.error("Error removing favorite:", error.message);
    res.status(500).json({ error: "Failed to remove product from favorites" });
  }
}

export async function getFavoritesCtrl(req, res) {
  const userId = req.authenticatedUserId;

  try {
    const favorites = await FavoriteService.getFavorites(userId);
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error.message);
    res
      .status(500)
      .json({ error: "Internal server error while fetching favorites." });
  }
}

export const FavoriteController = {
  addFavoriteCtrl,
  removeFavoriteCtrl,
  getFavoritesCtrl,
};
