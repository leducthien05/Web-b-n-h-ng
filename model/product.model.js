const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    product_category:{
        type:String,
        default: ""
    },
    slug: { 
        type: String, 
        slug: "title" 
    },
    category: String,
    description: String,
    image: String,
    stock: Number,
    discountPercentage: Number,
    status: String,
    position: Number,
    deleted: {
        type:Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;