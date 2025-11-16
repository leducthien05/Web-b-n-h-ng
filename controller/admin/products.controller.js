const Product = require("../../model/product.model");

const filterStatus = require("../../helper/filterStatus");
const search = require("../../helper/search");

module.exports.index = async (req, res)=>{
    let find = {
        deleted: false,
    }

    // Lọc sản phẩm theo trạng thái
    const filter = filterStatus.filterStatus(req.query);
    if(req.query.status){
        find.status = req.query.status;
    }

    //Tìm kiếm sản phẩm
    const searchProduct = search.searchKeyword(req.query);
    if(searchProduct.regex){
        find.title = searchProduct.regex;
    }
    const products = await Product.find(find);
    res.render("admin/page/products/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        filterStatus: filter,
        keyword: searchProduct.keyword
    })
}