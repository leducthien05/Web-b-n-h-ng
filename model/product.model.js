const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    category: String,
    description: String,
    image: String,
    stock: Number,
    discountPercentage: Number,
    status: String,
    position: Number,
    deleted: Boolean,
    deletedAt: Date
});

const Product = mongoose.model("Product", productSchema, "Products");
module.exports = Product;