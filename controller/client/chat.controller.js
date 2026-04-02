const Chat = require("../../model/chat.model");
const User = require("../../model/user.model");

const uploadCloudinary = require("../../helper/uploadToCloudinary");

module.exports.chat = async (req, res)=>{
    const user_id = res.locals.user._id;
    const userName = res.locals.user.username;
    //SocketIO
    _io.once("connection", (socket)=>{
        socket.on("CLIENT_SEND_MESSAGE", async (data)=>{
            let arrImage = [];
            try {
                for (const item of data.image) {
                    const image = await uploadCloudinary(item);
                    arrImage.push(image);
                }
            } catch (error) {
                console.log(error)
            }
            const chat = new Chat({
                user_id: user_id,
                content: data.content,
                image: arrImage
            });
            await chat.save();
            _io.emit("SERVER_RETURN_MESSAGE", {
                userID: user_id,
                userName: userName,
                content: data.content,
                image: arrImage
            });
        });
        
        socket.on("CLIENT_SEND_TYPING", (content)=>{
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