const Product = require("../../model/product.model");

module.exports.index = async (req, res)=>{
    res.render("admin/page/products/index", {
        titlePage: "Danh sách sản phẩm"
    })
}