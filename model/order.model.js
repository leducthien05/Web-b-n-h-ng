const mongoose = require("mongoose");
const { product } = require("../controller/client/product.controller");

const orderSchema = new mongoose.Schema({
    // user_ID: String,
    cart_ID: String,
    userInfo: {
        fullName: String,
        phone: String,
        address: String
    },
    product: [
        {
            product_id: String,
            price: Number,
            discountPercentage: Number,
            quantity: Number
        }
    ],
    description: String,
    status:{
        type: String,
        default: "active"
    },
    deleted: {
        type:Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;