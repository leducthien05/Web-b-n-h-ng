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

    const products = await Product.find(find).sort({position: "asc"}).limit(objectPagination.limitItem).skip(objectPagination.indexProduct);
    res.render("admin/page/products/index", {
        titlePage: "Danh sách sản phẩm",
        products: products,
        filterStatus: filter,
        keyword: searchProduct.keyword,
        pagination: objectPagination
    });
}

module.exports.change_status = async (req, res)=>{
    const id = req.params.id;
    const status = req.params.status;
    await Product.updateOne({
        _id: id
    }, {status: status});
    // res.redirect("/admin/products");
    res.redirect(req.get("referer") || "/");

}

module.exports.change_multi = async (req, res)=>{
    const ids = req.body.ids.split(", ");
    const status = req.body.status;

    try {
        switch (status) {
            case "active":
                await Product.updateMany({
                    _id: ids
                }, {status: "active"});
                break;
            case "inactive":
                await Product.updateMany({
                    _id: ids
                }, {status: "inactive"});
                break;
            case "delete-all":
                await Product.updateMany({
                    _id: ids
                }, {deleted: true});
                break;
            case "position":
                for(const item of ids){
                    let[id, newposition] = item.split("-");
                    newposition = parseInt(newposition);
                    await Product.updateOne({
                        _id: id
                    },{position: newposition});
                }
                
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error); 
    }
    

    res.redirect(req.get("referer") || "/");
}

module.exports.delete = async (req, res)=>{
    const id = req.params.id;
    try {
        await Product.updateOne({_id: id}, {deleted: true, deletedAt: new Date()}); 
    } catch (error) {
        console.log(error);
    }
    res.redirect(req.get("referer") || "/");
}