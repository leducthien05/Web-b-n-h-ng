const User = require("../../model/user.model");

const md5 = require("md5");

module.exports.register = async (req, res)=>{
    res.render("client/page/user/register", {
        titlePage: "Đăng ký tài khoản"
    });
}

module.exports.registerPost = async (req, res)=>{
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

module.exports.login = async (req, res)=>{
    res.render("client/page/user/login", {
        titlePage: "Đăng nhập"
    });
}

module.exports.loginPost = async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({
        email: email,
        deleted: false
    });
    if(!user){
        req.flash("error", "Email không tồn tại");
        res.redirect(req.get("referer") || "/");
        return;
    }
    if(md5(password) != user.password){
        req.flash("error", "Mật khẩu không đúng");
        res.redirect(req.get("referer") || "/");
        return;
    }

    if(user.status != "active"){
        req.flash("error", "Tài khoản đã bị khóa");
        res.redirect(req.get("referer") || "/");
        return;
    }

    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/");
}

module.exports.logout = async (req, res)=>{
    res.clearCookie("tokenUser");
    res.redirect("/");
}