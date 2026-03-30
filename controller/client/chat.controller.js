const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

module.exports.chat = async (req, res)=>{
    const user_id = res.locals.user._id;
    const userName = res.locals.user.username;
    //SocketIO
    _io.once("connection", (socket)=>{
        socket.on("CLIENT_SEND_MESSAGE", async (mes)=>{
            const chat = new Chat({
                user_id: user_id,
                content: mes
            });
            await chat.save();
            _io.emit("SERVER_RETURN_MESSAGE", {
                userID: user_id,
                userName: userName,
                content: mes
            });
        });
        
        socket.on("CLIENT_SEND_TYPING", (content)=>{
            console.log(content)
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                userID: user_id,
                userName: userName,
                type: content
            });
        });
    });
    const chat = await Chat.find({
        deleted: false
    });
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
    res.render("client/page/chat/index", {
        titlePage: "Liên hệ",
        chats: chat
    });

}