const User = require("../../model/user.model");

const friendSocket = require("../../socket/client/friend.socket");
// [GET] /friend/not-friend
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
// [GET] /friend/request-friend
module.exports.reqFriend = async (req, res) => {
    //Socket request cancel friend
    friendSocket.reqFriend(res);
    //End Socket request cancel friend
    const idUser = res.locals.user._id;
    const myUser = await User.findOne({
        _id: idUser,
    }).select("requestFriends");
    const requestFriends = myUser.requestFriends;
    const friends = await User.find({
        _id: { $in: requestFriends },
        status: "active",
        deleted: false
    }).select("avatar username");
    res.render("client/page/friend/reqFriend", {
        titlePage: "Lời mời đã gửi",
        friends: friends
    });
}
// [GET] /friend/accept-friend
module.exports.acceptFriend = async (req, res) => {
    // //Socket accept friend
    friendSocket.reqFriend(res);
    // //End Socket accept friend
    const idUser = res.locals.user._id;
    const myUser = await User.findOne({
        _id: idUser,
    }).select("acceptFriends");
    const acceptFriends = myUser.acceptFriends;
    const friends = await User.find({
        _id: { $in: acceptFriends },
        status: "active",
        deleted: false
    }).select("avatar username");
    res.render("client/page/friend/acceptFriend", {
        titlePage: "Lời mời đã gửi",
        friends: friends
    });
}
// [GET] /friend
module.exports.index = async (req, res) => {
    
    res.render("client/page/friend/index", {
        titlePage: "Danh sách bạn bè"
    });
}