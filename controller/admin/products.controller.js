const Product = require("../../model/product.model");

const filterStatus = require("../../helper/filterStatus.helper");
const search = require("../../helper/search.helper");
const paginationHelper = require("../../helper/pagination.helper");

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
    //Phân trang, cần dùng await vì bên trong sử dụng async
    const objectPagination = await paginationHelper.pagination(req.query, find);

    const products = await Product.find(find).limit(objectPagination.limitItem).skip(objectPagination.indexProduct);
    res.render("admin/page/products/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        filterStatus: filter,
        keyword: searchProduct.keyword,
        pagination: objectPagination
    });
}