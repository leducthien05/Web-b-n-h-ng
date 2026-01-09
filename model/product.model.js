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
    featured: String,
    position: Number,
    deleted: {
        type:Boolean,
        default: false
    },
    createdBy: {
        account_id: String,
        createAt: {
            type: Date,
            default: Date.now
        }
    },
    deletedBy: {
        account_id: String,
        deletedAt: Date
    },
    updatedBy: [
        {
            account_id: String,
            updatedAt: {
                type: Date,
                updatedAt: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema, "products");
module.exports = Product;