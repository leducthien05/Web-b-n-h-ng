const User = require("../../model/user.model");
const Forgot = require("../../model/forgot-password.model");

const md5 = require("md5");
const genereateHelper = require("../../helper/generateRandomString.helper");
const sendMailHelper = require("../../helper/sendMail.helper");

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
    res.clearCookie("cartID");
    res.redirect("/");
}

module.exports.forgotPassword = async (req, res)=>{
    res.render("client/page/user/forgot-password", {
        titlePage: "Quên mật khẩu"
    });
}

module.exports.forgotPasswordPost = async (req, res)=>{
    const email = req.body.email;
    const user = await User.findOne({
        email: email,
        status: "active",
        deleted: false
    });
    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect(req.get("referer") || "/");
        return;
    }
    //Lưu thông tin vào DB
        //Tạo OTP
    const otp = genereateHelper.generateRandomNumber(6);

    const objectForgotPass = {
        email: email,
        otp: otp,
        expireAt: new Date()
    };
    const record = new Forgot(objectForgotPass);
    await record.save();

    //Gửi OTP qua email
    const toEmail = email;
    const subject = "Mã OTP xác nhận";
    const html = `
        Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Sẽ hết hạn sau 3 phút
    `
    sendMailHelper.sendMail(toEmail, subject, html);
    

    res.redirect(`/user/password/otp?email=${email}`);
}

module.exports.otpGet = async (req, res)=>{
    const email = req.query.email;
    console.log(email);
    res.render("client/page/user/otp", {
        titlePage: "Lấy mã OTP",
        email: email
    })
}

module.exports.otpPost = async (req, res)=>{
    const email = req.body.email;
    const otp = req.body.otp;
    const result = await Forgot.findOne({
        email: email,
        otp: otp
    });
    console.log(result);
    if(!result){
        req.flash("error", "Mã OTP đã hết hạn!");
        res.redirect(req.get("referer") || "/");
        return;
    }
    const user = await User.findOne({
        email: email
    });
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset-password");
}

module.exports.resetPassword = async (req, res)=>{
    res.render("client/page/user/reset-password", {
        titlePage: "Đổi mật khẩu"
    })
}

module.exports.resetPasswordPost = async (req, res)=>{
    const tokenUser = req.cookies.tokenUser;
    const password = md5(req.body.password);

    await User.updateOne({
        tokenUser: tokenUser
    }, {password: password});

    res.redirect("/")
}