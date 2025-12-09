const Product = require("../../model/product.model");

module.exports.homepage = async (req, res)=>{
    const product = await Product.find({
        status: "active",
        deleted: false
    });
    res.render("client/page/home/index", {
        product: product,
        titlePage: "Trang chủ"
    })
}