const Product = require("../../model/product.model");

const newPriceArray = require("../../helper/newPrice.helper");

module.exports.product = async (req, res)=>{
    const find = {
        deleted: false,
        status: "active"
    };

    const products = await Product.find(find);
    
    //Tính giá mới
    const newProducts = newPriceArray.newPriceArray(products);

    res.render("client/page/products/index", {
        product: newProducts,
        titlePage: "Danh sách sản phẩm"
    })
}