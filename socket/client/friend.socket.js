const User = require("../../model/user.model");

module.exports.reqFriend = async (res) => {
    const idUser = res.locals.user._id;
    _io.once("connection", (socket) => {
        socket.on("SEND_FRIEND_REQUEST", async (ID) => {
            //Kiểm tra id người gửi có trong người nhận hay chưa
            const existAccepts = await User.findOne({
                _id: ID,
                acceptFriends: idUser
            });
            //Thêm yêu cầu vào người nhận
            if (!existAccepts) {
                await User.updateOne({
                    _id: ID
                }, {
                    $push: { acceptFriends: idUser }
                });
            }
            //Kiểm tra id người gửi có trong người gửi hay chưa
            const existRequests = await User.findOne({
                _id: idUser,
                requestFriends: ID
            });
            //Thêm yêu cầu vào người gửi
            if (!existRequests) {
                await User.updateOne({
                    _id: idUser
                }, {
                    $push: { requestFriends: ID }
                });
            }

            // Ví dụ: gửi realtime cho user kia
            socket.broadcast.emit("RETURN_NOTIFICATION", {
                text: "Bạn có một lời mời kêt bạn"

            });
        });
    });
}