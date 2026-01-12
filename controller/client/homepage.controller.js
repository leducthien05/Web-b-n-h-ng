const Product = require("../../model/product.model");
const Category = require("../../model/category-product.model");

const newPriceHelper = require("../../helper/newPrice.helper");

module.exports.homepage = async (req, res)=>{
    const productFeatured = await Product.find({
        deleted:false,
        status: "active",
        featured: "1"
    });
    const newProduct = newPriceHelper.newPriceArray(productFeatured);

    res.render("client/page/home/index", {
        titlePage: "Trang chủ",
        productFeatured: newProduct
    });
}