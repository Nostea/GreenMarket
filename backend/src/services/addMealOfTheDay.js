import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export async function addMealOfTheDay({ userId }) {
  try {
    console.log("UserId " + userId);
    const productsToAdd = [
      { name: "Carrot", quantity: 1 },
      { name: "Pepper", quantity: 1 },
      { name: "Zucchini", quantity: 1 },
      { name: "Onion", quantity: 1 },
      { name: "Whole Milk", quantity: 1 },
      { name: "Gouda", quantity: 1 },
    ];

    const products = [];
    for (const productData of productsToAdd) {
      const product = await Product.findOne({ name: productData.name });

      if (!product) {
        throw new Error(
          `Product not found for ingredient: ${productData.name}`
        );
      }

      products.push({
        productId: product._id,
        quantity: productData.quantity,
      });
    }

    // Finde den Warenkorb des Benutzers oder erstelle einen neuen
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] }); // Initialisiere cart.items als leeres Array
    } else {
      // Konvertiere ObjectId-Strings in ObjectId-Objekte für bestehende Items im Warenkorb
      cart.items.forEach((item) => {
        item.productId = item.productId.toString(); // Konvertiere ObjectId-Strings zu ObjectId-Objekten
      });
    }

    // Füge die Produkte dem Warenkorb hinzu
    for (const productToAdd of products) {
      // Prüfe, ob der Artikel bereits im Warenkorb vorhanden ist
      const existingItem = cart.items.find((item) =>
        item.productId.equals(productToAdd.productId)
      );

      if (existingItem) {
        // Produkt ist bereits im Warenkorb, erhöhe die Menge
        existingItem.quantity += productToAdd.quantity;
      } else {
        // Produkt ist neu im Warenkorb, füge es hinzu
        cart.items.push(productToAdd);
      }
    }

    // Speichere den aktualisierten Warenkorb in der Datenbank
    await cart.save();

    return cart;
  } catch (error) {
    console.error("Error adding meal of the day to cart:", error);
    throw error;
  }
}
