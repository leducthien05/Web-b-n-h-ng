const User = require("../../model/user.model");

module.exports.requireAuth = async (req, res, next)=>{
    if(!req.cookies.tokenUser){
        res.redirect(`/user/login`);
        return;
    }else{
        const record = await User.findOne({
            tokenUser: req.cookies.tokenUser
        }).select("-password");
        if(record){
            res.locals.user = record;
            next();
        }else{
            res.redirect(`/user/login`);
            return;
        }
    }
}