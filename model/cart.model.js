const mongoose = require("mongoose");
const generate = require("../helper/generateRandomString.helper");

const cartSchema = new mongoose.Schema({
    user_id: String,
    password: String,
    role_id: {
        type: String,
        default: ""
    },
    description: String,
    token: {
        type: String,
        default: generate.generateRandomString(20)
    },
    phone: String,
    email: String,
    avatar: String,
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

const Cart = mongoose.model("Cart", cartSchema, "cart");
module.exports = Cart;