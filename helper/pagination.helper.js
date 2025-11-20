const Product = require("../model/product.model");

module.exports.pagination = async (query, find)=>{
    const objectPagination = {
        limitItem: 4,
        currentPage: 1
    };
    const total = await Product.countDocuments(find);
    const totalPage = Math.ceil(total / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    if(query.page){
        objectPagination.currentPage = parseInt(query.page)
    }
    const indexProduct = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    objectPagination.indexProduct = indexProduct;

    return objectPagination;
}