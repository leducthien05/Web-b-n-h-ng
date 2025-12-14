const Category = require("../../model/category-product.model");
const prefixAdmin = require("../../config/system");
const filterStatus = require("../../helper/filterStatus.helper");
const pagination = require("../../helper/pagination.helper");

module.exports.index = async (req, res)=>{
    //Điều kiện hiển thị 
    let find = {
        deleted: false
    }
    //Lọc sản phẩm theo trạng thái
    const listStatus = filterStatus.filterStatus(req.query);
    if(req.query.status){
        find.status = req.query.status;
    }
    //Phân trang
    const objectPagination = await pagination.pagination(req.query, find);

    const record = await Category.find(find).limit(objectPagination.limitItem).skip(objectPagination.indexProduct);
    res.render("admin/page/category-products/index", {
        titlePage: "Danh mục sản phẩm",
        record: record,
        listStatus:listStatus,
        pagination:objectPagination
    });
}

module.exports.create = async (req, res)=>{
    res.render("admin/page/category-products/create", {
        titlePage: "Thêm mới danh mục"
    });
}

module.exports.createPost = async (req, res)=>{
    try {
        if(req.body.position == ""){
            const count = await Category.countDocuments();
            req.body.position = count + 1;
        }else{
            req.body.position = parseInt(req.body.position);
        }
        const record = new Category(req.body);
        await record.save();
        res.redirect(`${prefixAdmin.prefixAdmin}/products`);
    } catch (error) {
        console.log(error);
    }
    
}