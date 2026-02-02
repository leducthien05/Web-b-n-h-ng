const mongoose = require("mongoose");
const generate = require("../helper/generateRandomString.helper");

const settingSchema = new mongoose.Schema({
    websiteName: String,
    logo: String,
    email: String,
    phone:String,
    address: String,
    copyright: String,
}, {
    timestamps: true
});

const Setting = mongoose.model("Setting", settingSchema, "setting-general");
module.exports = Setting;