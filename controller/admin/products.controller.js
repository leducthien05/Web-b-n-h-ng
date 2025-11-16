const Product = require("../../model/product.model");

const filterStatus = require("../../helper/filterStatus");
module.exports.index = async (req, res)=>{
    let find = {
        deleted: false,
    }

    // Lọc sản phẩm theo trạng thái
    const filter = filterStatus.filterStatus(req.query);
    if(req.query.status){
        find.status = req.query.status;
    }
    const products = await Product.find(find);
    res.render("admin/page/products/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        filterStatus: filter
    })
}