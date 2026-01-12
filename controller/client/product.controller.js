const Product = require("../../model/product.model");
const Category= require("../../model/category-product.model");

const newPriceArray = require("../../helper/newPrice.helper");
const createTree = require("../../helper/createTree.helper");
const getSubCategory = require("../../helper/getSubCategory.helper");

module.exports.product = async (req, res)=>{
    const find = {
        deleted: false,
        status: "active"
    };
    const products = await Product.find(find);
    
    //Tính giá mới
    const newProducts = newPriceArray.newPriceArray(products);
    res.render("client/page/products/index", {
        product: newProducts,
        titlePage: "Danh sách sản phẩm"
    });
}

module.exports.detail = async (req, res)=>{
    try {
        const product = await Product.findOne({
            slug: req.params.slugProduct,
            status: "active",
            deleted: false
        });

        if (!product) {
            return res.redirect("/");
        }

        // Tính giá sau giảm
        product.newPrice = product.price * (1 - product.discountPercentage / 100);

        // Lấy category
        const category = await Category.findOne({
            deleted: false,
            status: "active",
            _id: product.product_category
        });
       

        res.render("client/page/products/detail", {
            titlePage: product.title,
            product: product,
            recordCategory: category
        });

    } catch (error) {
        console.log(error);
        res.redirect(req.get("referer") || "/");
    }

}

module.exports.category = async (req, res)=>{
    const slug = req.params.slug;
    const record = await Category.findOne({
        deleted: false,
        status: "active",
        slug: slug
    });

    //Lấy ID của các danh mục con
    const listIdCategory = getSubCategory.getSubCategoryID(record.id);
    const getSubCategoryID = (await listIdCategory).map(item => item.id);
    
    const product = await Product.find({
        deleted: false,
        status: "active",
        product_category: {$in: [record.id, ...getSubCategoryID]}
    }).sort({position: "desc"});
    //Tính giá mới
    const newProducts = newPriceArray.newPriceArray(product);
    
    res.render("client/page/products/index", {
        titlePage: record.title,
        product: newProducts
    });
}