const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: String,
    products:[
        {
            product_id: String,
            quantity: Number
        }
    ],
    deleted: {
        type: Boolean,
        default: false
    }
}, 
{
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema, "cart");
module.exports = Cart;