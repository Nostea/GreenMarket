import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: { type: Number, required: true },
    rating: { type: Number, default: 3 },
    ratingAmount: { type: Number, default: 50 },
    unit: { type: String, enum: ["kg", "liter", "piece"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "products", timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
