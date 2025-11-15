const Product = require("../../model/product.model");

module.exports.dashboard = async (req, res)=>{
    res.render("admin/page/dashboard/index", {
        titlePage: "Trang tổng quan"
    })
}