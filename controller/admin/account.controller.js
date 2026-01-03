const Account = require("../../model/account.model");
const Role = require("../../model/role.model");

const prefixAdmin = require("../../config/system");
const md5 = require("md5");

module.exports.index = async (req, res)=>{
    const record = await Account.find({
        deleted: false
    });
    for (const item of record) {
        const role = await Role.findOne({
            deleted: false,
            _id: item.role_id
        });
        item.role = role.title;
    }
    res.render("admin/page/account/index", {
        titlePage: "Tài khoản",
        record: record
    });
}

module.exports.create = async (req, res)=>{
    const record = await Role.find({
        deleted: false,
    });

    res.render("admin/page/account/create", {
        titlePage: "Thêm mới tài khoản",
        record: record
    });
}

module.exports.createPost = async (req, res)=>{
    console.log(req.body);
    const existEmail = await Account.findOne({
        deleted: false,
        email: req.body.email
    });

    if(existEmail){
        req.flash("error", "Email đã tồn tại, vui lòng nhập email khác!");
        res.redirect(req.get("referer") || "/");
    }else{
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${prefixAdmin.prefixAdmin}/accounts`);
    }
  
}

module.exports.edit = async (req, res)=>{
    //Lấy quyền
    const roles = await Role.find({
        deleted: false
    })
    //Lấy tài khoản sửa
    const id = req.params.id;
    const record = await Account.findOne({
        deleted: false,
        _id: id
    });
    res.render("admin/page/account/edit", {
        titlePage: "Chỉnh sửa tài khoản",
        record: record,
        roles: roles
    });
}

module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;
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
        res.redirect(req.get("referer") || "/");
    }
    
}