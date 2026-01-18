const Cart = require("../../model/cart.model");

module.exports.cartID = async (req, res, next)=>{
    if(req.cookies.cartID){
        const cart = await Cart.findOne({
            _id: req.cookies.cartID,
            deleted: false
        });
        if(cart){
            res.locals.cart = cart;

        }
    }else{
        const cart = new Cart();
        cart.save();
        const expriesCookie = 60 * 60 * 24 * 365 * 1000;
        res.cookie("cartID", cart.id, {
            expires: new Date(Date.now() + expriesCookie)
        });
    }
    next();
}