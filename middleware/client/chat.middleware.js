const Room = require("../../model/room_chat.model");
const User = require("../../model/user.model");

module.exports.chat = async (req, res, next)=>{
    const room_id = req.params.roomchatID;
    if(room_id){
        const room = await Room.findOne({
            _id: room_id
        });
        const user = room.user.find(item => item.user_id == res.locals.user._id);
        if(user){
            next();
        }else{
            req.flash("error", "Bạn không trong nhóm chat");
            res.redirect("/friend");
        }
    }else{
        req.flash("error", "Bạn không trong nhóm chat");
        res.redirect("/friend");
    }
}