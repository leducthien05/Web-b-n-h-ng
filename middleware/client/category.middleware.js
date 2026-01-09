const Category = require("../../model/category-product.model");
const createTree = require("../../helper/createTree.helper");


module.exports.category = async (req, res, next)=>{
    const category = await Category.find({
        deleted: false,
        status: "active"
    });
    const newcategory = createTree.tree(category);
    res.locals.category = newcategory;
    next();
}