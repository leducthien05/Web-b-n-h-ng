const User = require("../../model/user.model");
const Chat = require("../../model/chat.model");

const chatSocketIO = require("../../socket/client/chat.socket");

module.exports.chat = async (req, res)=>{
    //SocketIO
    chatSocketIO(res);
    //End SocketIO
    
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