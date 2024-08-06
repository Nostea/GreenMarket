import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["cancelled", "processing", "completed"],
      default: "processing",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid", "refunded"],
      default: "unpaid",
    },
    totalAmount: {
      type: Number,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "orders", timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
