const mongoose = require("mongoose");

const forgotPasswordSchema = new mongoose.Schema({
    email: String,
    otp:String,
    expireAt: {
        type: Date,
        expires: 180
    },
    
}, 
{
    timestamps: true
});

const Forgot = mongoose.model("Forgot", forgotPasswordSchema, "forgot-password");
module.exports = Forgot;