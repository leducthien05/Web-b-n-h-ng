const Role = require("../../model/role.model");

const prefixAdmin = require("../../config/system");

module.exports.index = async (req, res)=>{
    const record = await Role.find({
        deleted: false
    });
    res.render("admin/page/role/index", {
        titlePage: "Trang quyền",
        record: record
    });
}

module.exports.create = async (req, res)=>{
    res.render("admin/page/role/create", {
        titelPage: "Thêm mới nhóm quyền",
    });
}

module.exports.createPost = async (req, res)=>{
    console.log(req.body);
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm mới thành công!");
    res.redirect(`${prefixAdmin.prefixAdmin}/roles`);
}

module.exports.edit = async (req, res)=>{
    const id = req.params.id;
    const record = await Role.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/page/role/edit", {
        titlePage: "Chinh sửa nhóm quyền",
        record: record
    })
}

module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;
    await Role.updateOne({
        _id: id
    }, req.body);
    res.redirect(req.get("referer") || "/");

}

module.exports.permission = async (req, res)=>{
    const record = await Role.find({
        deleted: false,
        status: "active"
    });
    req.flash("success", "Cập nhật thành công");
    res.render("admin/page/role/permission", {
        titlePage: "Phân quyền",
        record: record
    })
}

module.exports.permissionPatch = async (req, res)=>{
    try {
        const permission = JSON.parse(req.body.permission);
        for (const item of permission) {
            await Role.updateOne({
                _id: item.id
            }, {permission: item.permission});
        }
        res.redirect(req.get("referer") || "/");
    } catch (error) {
        console.log(error);
    }
}