const Chat = require("../../model/chat.model");
const uploadCloudinary = require("../../helper/uploadToCloudinary");


module.exports = (req, res) => {
    const user_id = res.locals.user._id;
    const userName = res.locals.user.username;
    const roomChatId = req.params.roomchatID
    _io.once("connection", (socket) => {
        socket.join(roomChatId)
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            let arrImage = [];
            try {
                for (const item of data.image) {
                    const image = await uploadCloudinary(item);
                    arrImage.push(image);
                }
            } catch (error) {
                console.log(error)
            }
            try {
                const chat = new Chat({
                    user_id: user_id,
                    content: data.content,
                    image: arrImage,
                    room_chat_id: roomChatId,
                });
                await chat.save();
            } catch (error) {
                console.log(error)
            }

            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                userID: user_id,
                userName: userName,
                content: data.content,
                image: arrImage
            });
        });

        socket.on("CLIENT_SEND_TYPING", (content) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                userID: user_id,
                userName: userName,
                type: content
            });

        });
    });
}