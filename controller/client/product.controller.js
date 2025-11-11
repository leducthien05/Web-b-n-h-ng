const Product = require("../../model/product.model");

module.exports.product = async (req, res)=>{
    const find = {
        deleted: false,
        status: "active"
    };

    const products = await Product.find(find);
    
    //Tính giá mới
    products.forEach(item =>{
        return item.newPrice =  item.price * (1 - item.discountPercentage/100);
    })
    console.log(products);

    res.render("client/page/products/index", {
        product: products,
        titlePage: "Danh sách sản phẩm"
    })
}