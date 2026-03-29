const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

module.exports.chat = async (req, res)=>{
    const user_id = res.locals.user._id;
    //SocketIO
    _io.once("connection", (socket)=>{
        socket.on("CLIENT_SEND_MESSAGE", async (mes)=>{
            const chat = new Chat({
                user_id: user_id,
                content: mes
            });
            await chat.save();
        });
    });
    const chat = await Chat.find({
        deleted: false
    });
    console.log(chat);
    const userID = chat.map(item => item.user_id);
    const user = await User.find({
        _id: {$in: userID}
    }).select("username");
    const userMap = {};
    user.forEach(item =>{
        userMap[item._id] = item.username;
    });
    chat.forEach(item =>{
        item.name = userMap[item.user_id];
    });
    console.log(chat[0].content);
    res.render("client/page/chat/index", {
        titlePage: "Liên hệ",
        chats: chat
    });

}