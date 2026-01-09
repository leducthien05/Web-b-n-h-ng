const Product = require("../../model/product.model");
const Category = require("../../model/category-product.model");


module.exports.homepage = async (req, res)=>{
    res.render("client/page/home/index", {
        titlePage: "Trang chủ"
    });
}