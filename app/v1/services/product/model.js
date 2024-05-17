const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    creator_id: { type: mongoose.Types.ObjectId, ref: "Admin" },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema, "Product");
module.exports = Product;
