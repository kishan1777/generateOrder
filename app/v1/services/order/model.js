const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, ref: "User" },
    product_id: { type: mongoose.Types.ObjectId, ref: "Product" },
    product_creator_id: { type: mongoose.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema, "Order");
module.exports = Order;
