const Product = require("../../model/product.model");
const Category = require("../../model/category-product.model");

const prefixAdmin = require("../../config/system");
const filterStatus = require("../../helper/filterStatus.helper");
const search = require("../../helper/search.helper");
const paginationHelper = require("../../helper/pagination.helper");
const createTree = require("../../helper/createTree.helper");


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

    //Sắp xếp sản phẩm theo tiêu chí
    const sort = {}
    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }else{
        sort.position = "desc";
    }

    //Phân trang, cần dùng await vì bên trong sử dụng async
    const objectPagination = await paginationHelper.pagination(req.query, find);

    const products = await Product.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.indexProduct);
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
    req.flash("success", "Thay đổi trạng thái sản phẩm thành công thành công!");
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
                req.flash("success", `Thay đổi trạng thái ${ids.length} sản phẩm thành công thành công!`);

                break;
            case "inactive":
                await Product.updateMany({
                    _id: ids
                }, {status: "inactive"});
                req.flash("success", `Thay đổi trạng thái ${ids.length} sản phẩm thành công thành công!`);
                break;
            case "delete-all":
                await Product.updateMany({
                    _id: ids
                }, {deleted: true});
                req.flash("success", `Xóa thành công ${ids.length} sản phẩm thành công thành công!`);
                break;
            case "position":
                for(const item of ids){
                    let[id, newposition] = item.split("-");
                    newposition = parseInt(newposition);
                    await Product.updateOne({
                        _id: id
                    },{position: newposition});
                    req.flash("success", `Thay đổi vị trí ${ids.length} sản phẩm thành công thành công!`);
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

    req.flash("success", "Xóa thành công sản phẩm vào thùng rác!");
    res.redirect(req.get("referer") || "/");
}

module.exports.create = async (req, res)=>{
    const record = await Category.find({
        deleted: false
    });
    const newRecord = createTree.tree(record);
    res.render("admin/page/products/create", {
        titlePage: "Thêm sản phẩm",
        record: newRecord
    })
}

module.exports.createPost = async (req, res)=>{
    console.log(req.body);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }

    const newProduct = new Product(req.body);
    await newProduct.save();

    req.flash("success", "Thêm mới thành công!");
    res.redirect(`${prefixAdmin.prefixAdmin}/products`);
}

module.exports.edit = async (req, res)=>{
    const id = req.params.id;
    const record = await Category.find({
        deleted: false
    });
    const newRecord = createTree.tree(record);
    const product = await Product.findOne({
        _id: id,
        deleted: false,
        
    });
    res.render("admin/page/products/edit", {
        titlePage: "Chỉnh sửa sản phẩm",
        product: product,
        record:newRecord
    });
}

module.exports.editPatch = async (req, res)=>{
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if(req.body.position == ""){
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    if(req.body.image){
        req.body.image = `${prefixAdmin.prefixAdmin}/upload/${req.file.filename}`;
    }

    try {
        await Product.updateOne({
            _id: id
        }, req.body);
        res.redirect(req.get("referer") || "/");
    } catch (error) {
        console.log(error);
        res.redirect(req.get("referer") || "/");
    }
    


}

module.exports.detail = async (req, res)=>{
    const id = req.params.id;
    const product = await Product.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/page/products/detail", {
        titlePage: product.title,
        product:product
    });
}