const Setting = require("../../model/setting-general.model");

module.exports.setting = async (req, res, next)=>{
    const record = await Setting.findOne({});
    if(record){
        res.locals.setting = record;
    }
    next();
}