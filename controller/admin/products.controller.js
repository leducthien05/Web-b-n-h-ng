const Product = require("../../model/product.model");

module.exports.index = async (req, res)=>{
    const find = {
        deleted: false,
    }
    const products = await Product.find(find);
    console.log(products);
    res.render("admin/page/products/index", {
        titlePage: "Danh sách sản phẩm",
        products: products
    })
}