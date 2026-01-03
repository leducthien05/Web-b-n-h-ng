const Account = require("../../model/account.model");

const md5 = require("md5");
const prefixAdmin = require("../../config/system");

module.exports.login = async (req, res)=>{
    res.render("admin/auth/login", {
        titlePage: "Đăng nhập"
    });
}

module.exports.loginPost = async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        deleted: false,
        email: email
    });

    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect(req.get("referer") || "/");
        return;
    }

    if(md5(password) != user.password){
        req.flash("error", "Mật khẩu không đúng");
        res.redirect(req.get("referer") || "/");
        return;
    }

    if(user.status !="active"){
        req.flash("error", "Tài khoản đã bị khóa");
        res.redirect(req.get("referer") || "/");
        return;
    }

    res.cookie("token", user.token);
    res.redirect(`${prefixAdmin.prefixAdmin}/dashboard`);
}

module.exports.logout = async (req, res)=>{
    res.clearCookie("token");
    res.redirect(`${prefixAdmin.prefixAdmin}/auth/login`);
}