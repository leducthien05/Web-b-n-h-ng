const mongoose = require("mongoose");

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

const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;