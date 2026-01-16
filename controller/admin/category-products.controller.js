const Category = require("../../model/category-product.model");
const prefixAdmin = require("../../config/system");
const filterStatus = require("../../helper/filterStatus.helper");
const pagination = require("../../helper/pagination.helper");
const createTree = require("../../helper/createTree.helper");

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

    const newRecord = createTree.tree(record);
    const childent = await Category.find({
        parent_ID: "693eb42fe2bcb13ff433ace2"
    });
    console.log(childent);

    res.render("admin/page/category-products/index", {
        titlePage: "Danh mục sản phẩm",
        record: newRecord,
        listStatus:listStatus,
        pagination:objectPagination
    });
}

module.exports.create = async (req, res)=>{
    let find = {
        deleted: false
    }
    const record = await Category.find(find);

    const createTree = (arr, parent_Id="")=>{
        //Khai báo mảng chứa
        const tree = [];
        //Lặp qua từng phần tử để tìm danh mục con
        arr.forEach(item => {
            if(item.parent_ID == parent_Id){
                const newItem = item
                //Đệ quy để tìm các danh mục con
                const children = createTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree
    }

    const tree = createTree(record);
    res.render("admin/page/category-products/create", {
        titlePage: "Thêm mới danh mục",
        record: tree
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
        res.redirect(`${prefixAdmin.prefixAdmin}/products-category`);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports.editGet = async (req, res)=>{
    try {
        const id = req.params.id;
        const product = await Category.findOne({
            deleted: false,
            _id: id
        });
        const record = await Category.find({
            deleted:false
        });
        const newRecord = createTree.tree(record);
        res.render("admin/page/category-products/edit", {
            titlePage: "Chỉnh sửa danh mục",
            product: product,
            record: newRecord
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports.editPatch = async (req, res)=>{
    try {
        const id = req.params.id;
        req.body.position = parseInt(req.body.position);
    
        await Category.updateOne({
            _id: id
        }, req.body);

        res.redirect(`${prefixAdmin.prefixAdmin}/products-category`);
    } catch (error) {
        console.log(error);
    }
}