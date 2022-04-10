const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
