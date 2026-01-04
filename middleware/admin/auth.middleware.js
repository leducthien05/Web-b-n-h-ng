const prefixAdmin = require("../../config/system");
const Account = require("../../model/account.model");

module.exports.requireAuth = async (req, res, next)=>{
    if(!req.cookies.token){
        res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
        return;
    }else{
        const record = await Account.findOne({
            token: req.cookies.token
        });
        if(record){
            next();
        }else{
            res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
            return;
        }
    }
}