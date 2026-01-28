const User = require("../../model/user.model");

const md5 = require("md5");

module.exports.register = async (req, res)=>{
    res.render("client/page/user/register", {
        titlePage: "Đăng ký tài khoản"
    });
}

module.exports.registerPost = async (req, res)=>{
    const record = req.body;
    const existEmail = await User.findOne({
        email: req.body.email,
        status: "active",
        deleted: false
    });
    if(existEmail){
        req.flash("error", "Email đã tồn tại! Vui lòng nhập email khác");
        res.redirect(req.get("referer") || "/");
        return;
    }else{
        req.body.password = md5(req.body.password);
        const user = new User(req.body);
        await user.save();
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/");
    }
    
}