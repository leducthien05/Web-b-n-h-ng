const User = require("../../model/user.model");
const Room = require("../../model/room_chat.model");

// [GET] /room-chat
module.exports.index = async (req, res) => {
    const user = res.locals.user;
    const roomChat = await Room.find({
        type_room: "group",
        "user.user_id": user.id
    });
    console.log(roomChat);
    res.render("client/page/room-chat/index", {
        titlePage: "Phòng chat",
        room: roomChat
    });
}
// [GET] /room-chat/create
module.exports.create = async (req, res) => {
    const user = res.locals.user;
    const idFriend = user.listFriends.map(item => item.friend_id);
    const infoFriend = await User.find({
        _id: { $in: idFriend }
    }).select("username avatar id");
    user.infoFriend = infoFriend;
    res.render("client/page/room-chat/create", {
        titlePage: "Phòng chat"
    });
}
// [POST] /room-chat/create
module.exports.createPost = async (req, res) => {
    const user = res.locals.user;
    const title = req.body.title;
    const dataRoom = {
        title: title,
        type_room: "group",
        status: "status",
        user: []
    }
    req.body.user_id.forEach(item => {
        dataRoom.user.push({
            user_id: item,
            role: "user"
        });
    });
    dataRoom.user.push({
        user_id: user.id,
        role: "supperAdmin"
    });
    const roomChat = new Room(dataRoom);
    await roomChat.save();
    res.redirect(`/chat/${roomChat.id}`);
}