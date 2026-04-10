const User = require("../../model/user.model");

const friendSocket = require("../../socket/client/friend.socket");
// [GET] /friend
module.exports.notFriend = async (req, res) => {
    //Socket request add friend
    friendSocket.reqFriend(res);
    //End Socket request add friend
    const idUser = res.locals.user.id;
    const myUsert = await User.findOne({
        _id: idUser,
    }).select("requestFriends acceptFriends");
    const arrRequest = myUsert.requestFriends;
    const arrAccept = myUsert.acceptFriends;
    const user = await User.find({
        _id: { $nin: [idUser, ...arrAccept, ...arrRequest] },
        status: "active",
        deleted: false
    }).select("id avatar username");
    res.render("client/page/friend/notFriend", {
        titlePage: "Bạn bè",
        friends: user
    });
}