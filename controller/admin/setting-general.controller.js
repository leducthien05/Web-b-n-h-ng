const Setting = require("../../model/setting-general.model");

module.exports.index = async (req, res)=>{
    const settingGeneral = await Setting.findOne({});
    res.render("admin/page/setting-general/index", {
        titlePage: "Cài đặt chung",
        settingGeneral: settingGeneral
    });
}

module.exports.Update = async (req, res)=>{
    const record = await Setting.findOne({});
    if(record){
        await Setting.updateOne({
            _id: record._id
        }, req.body);
    }else{
        const settingGeneral =  new Setting(req.body);
        await settingGeneral.save();
    }
    res.redirect(req.get("referer") || "/admin/dashboard");
}