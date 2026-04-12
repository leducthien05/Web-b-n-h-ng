const User = require("../../model/user.model");

module.exports.reqFriend = async (res) => {
    const idUser = res.locals.user.id;
    _io.once("connection", (socket) => {
        //Gửi yêu cầu kết bạn
        socket.on("SEND_FRIEND_REQUEST", async (ID) => {
            //idUsesr: id của A
            //ID: id của B
            //Kiểm tra A người gửi có trong B hay chưa
            const existAccepts = await User.findOne({
                _id: ID,
                acceptFriends: idUser
            });
            //Thêm A vào B
            if (!existAccepts) {
                await User.updateOne({
                    _id: ID
                }, {
                    $push: { acceptFriends: idUser }
                });
            }
            //Kiểm tra B có trong a
            const existRequests = await User.findOne({
                _id: idUser,
                requestFriends: ID
            });
            //Thêm B vào A
            if (!existRequests) {
                await User.updateOne({
                    _id: idUser
                }, {
                    $push: { requestFriends: ID }
                });
            }

            // Ví dụ: gửi realtime cho B
            const userAccept = await User.findOne({
                _id: ID,

            });
            const newLength = userAccept.acceptFriends.length;
            socket.broadcast.emit("RETURN_LENGTH_ACCEPT_FRIEND", {
                IDUser: ID,
                newLength: newLength,
                infoUser: userAccept
            });

            // Lấy thông tin của A trả về cho B
            const userA = await User.findOne({
                _id: idUser
            }).select("username image id");
            socket.broadcast.emit("RETURN_ACCEPT_FRIEND", {
                IDUser: ID,
                infoUser: userA
            });
            
        });

        //Hủy gửi yêu cầu kết bạn
        socket.on("SEND_CANCEL_FRIEND_REQUEST", async (ID) => {
            //idUsesr: id của A
            //ID: id của B
            const existRequest = await User.findOne({
                _id: idUser,
                requestFriends: ID
            });
            if (existRequest) {
                try {
                    await User.updateOne({
                        _id: idUser
                    }, {
                        $pull: {
                            requestFriends: ID
                        }
                    });
                } catch (error) {
                    console.log(error)
                }

            }
            const existAccept = await User.findOne({
                _id: ID,
                acceptFriends: idUser
            });
            if (existAccept) {
                await User.updateOne({
                    _id: ID
                }, {
                    $pull: {
                        acceptFriends: idUser
                    }
                });
            }
            // Ví dụ: gửi realtime cho B
            const userAccept = await User.findOne({
                _id: ID,

            });
            const newLength = userAccept.acceptFriends.length;
            socket.broadcast.emit("RETURN_LENGTH_ACCEPT_FRIEND", {
                IDUser: ID,
                newLength: newLength,
                myID: idUser
            });
        });
        
        // Từ chối yêu cầu kết bạn
        socket.on("CLIENT_REFUSE_REQUEST", async (ID) =>{
            //idUsesr: id của A
            //ID: id của B
            //Kiểm tra ID tồn tại trong requestFriends hay không
            const existRequest = await User.findOne({
                _id: ID,
                requestFriends: idUser
            });
            // Xóa id khỏi request
            if(existRequest){
                await User.updateOne({
                    _id: ID
                }, {
                    $pull: {requestFriends: idUser}
                });
            }
            //Kiểm tra ID tồn tại trong acceptFriends hay không
            const existAccept = await User.findOne({
                _id: idUser,
                acceptFriends: ID
            });
            // Xóa id khỏi accept
            if(existAccept){
                await User.updateOne({
                    _id: idUser
                }, {
                    $pull: {acceptFriends: ID}
                });
            }
            const userRequest = await User.findOne({
                _id: ID,
            });
            const newLength = userRequest.requestFriends.length;
            socket.emit("RETURN_LENGTH_ACCEPT_FRIEND", {
                IDUser: idUser,
                newLength: newLength    
            });
        });

        //Chấp nhận yêu cầu kết bạn
        socket.on("CLIENT_ACCEPT_REQUEST", async (ID) =>{
            //idUsesr: id của A
            //ID: id của B
            //Kiểm tra ID tồn tại trong requestFriends hay không
            const existRequest = await User.findOne({
                _id: ID,
                requestFriends: idUser
            });
            // Xóa id khỏi request
            // Thêm {friend_id, room_chat_id} của A vào listFriends của B
            if(existRequest){
                await User.updateOne({
                    _id: ID
                }, {
                    $push: {
                        listFriends: {
                            friend_id: idUser,
                            room_chat_id: ""
                        }
                    },
                    $pull: {requestFriends: idUser}
                });
            }
            //Kiểm tra ID tồn tại trong acceptFriends hay không
            const existAccept = await User.findOne({
                _id: idUser,
                acceptFriends: ID
            });
            // Xóa id khỏi accept
            // Thêm {friend_id, room_chat_id} của B vào listFriends của a
            if(existAccept){
                await User.updateOne({
                    _id: idUser
                }, {
                    $push: {
                        listFriends: {
                            friend_id: ID,
                            room_chat_id: ""
                        }
                    },
                    $pull: {acceptFriends: ID}
                });
            }
        });
    });
}