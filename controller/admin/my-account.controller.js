const Account = require("../../model/account.model");

const prefixAdmin = require("../../config/system");
const md5 = require("md5");

module.exports.detail = async (req, res)=>{
    res.render("admin/page/my-account/index", {
        titlePage: "Thông tin tài khoản"
    });
}

module.exports.edit = async (req, res)=>{
    res.render("admin/page/my-account/edit", {
        titlePage: "Chỉnh sửa thông tin"
    });
}

module.exports.editPatch = async (req, res)=>{
    const id = res.locals.user._id;

    const existEmail = await Account.findOne({
        _id: {$ne: id},
        email: req.body.email,
        deleted: false
    });
    if(existEmail){
        req.flash("error", "Email đã tồn tại! Vui lòng nhập email khác");
        res.redirect(res.get("referer") || "/");
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password);
        }else{
            delete req.body.password;
        }
        await Account.updateOne({
            _id: id
        }, req.body);
        req.flash("success", "Cập nhật thông tin thành công");
        res.redirect(req.get("referer") || "/");
    }
    
}