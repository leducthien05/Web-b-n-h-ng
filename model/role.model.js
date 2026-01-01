const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: String,
    permission:{
        type: Array,
        default: []
    },
    description: String,
    status:{
        type: String,
        default: "active"
    },
    deleted: {
        type:Boolean,
        default: false,
        unique: true
    },
    deletedAt: Date
}, {
    timestamps: true
});

const Role = mongoose.model("Role", roleSchema, "roles");
module.exports = Role;