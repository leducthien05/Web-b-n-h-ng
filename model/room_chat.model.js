const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    user_id: String,
    title: String,   
    avatar: String,
    type_room: String,
    status: {
        type: String,
        default: "active"
    },
    user: [
        {
            user_id: String,
            role: String
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

const Roome = mongoose.model("Room", roomSchema, "room_chat");
module.exports = Roome;