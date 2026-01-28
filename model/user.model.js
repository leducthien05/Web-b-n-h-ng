const mongoose = require("mongoose");
const generate = require("../helper/generateRandomString.helper");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    tokenUser: {
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

const User = mongoose.model("User", userSchema, "users");
module.exports = User;