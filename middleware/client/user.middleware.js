const User = require("../../model/user.model");
const Cart = require("../../model/cart.model");
module.exports.infoUser = async (req, res, next)=>{
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            status: "active",
            deleted: false
        }).select("-password");

        if(user){
            res.locals.user = user;
            const cart = await Cart.findOne({
                user_id: user._id,
                deleted: false
            });
            if(cart){
                res.cookie("cartID", cart._id);
            }
        }
        
    }
    next();
}