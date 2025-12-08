module.exports.create = (req, res, next)=>{
    if(!req.body.title){
        req.flash("error", `Vui lòng nhập tiêu đề!`);
        res.redirect(req.get("referer") || "/");
        return;
    }
    console.log("OK");
    next();
}

module.exports.edit = (req, res, next)=>{
    if(!req.body.title){
        req.flash("error", `Vui lòng nhập tiêu đề!`);
        res.redirect(req.get("referer") || "/");
        return;
    }
    console.log("OK");
    next();
}