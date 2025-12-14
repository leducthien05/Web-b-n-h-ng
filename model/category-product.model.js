const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
mongoose.plugin(slug)

const categorySchema = new mongoose.Schema({
    title:String,
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    parent_ID: {
        type: String,
        default: ""
    },
    description: String,
    image: String,
    status: {
        type: String,
        default: "active"
    },
    position:Number,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema, "category-products"); 
module.exports = Category;