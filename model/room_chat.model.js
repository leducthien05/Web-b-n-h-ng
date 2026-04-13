const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
    title: String,   
    avatar: String,
    type_room: String,
    status: String,
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