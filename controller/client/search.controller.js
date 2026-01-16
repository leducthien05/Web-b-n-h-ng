const Product = require("../../model/product.model");
const Category = require("../../model/category-product.model");
const searchHelper = require("../../helper/search.helper");


module.exports.search = async (req, res)=>{
    if(req.query.keyword){
        const objectSearch = searchHelper.searchKeyword(req.query);
        const product = await Product.find({
            status: "active",
            deleted: false,
            title: objectSearch.regex
        });
        res.render("client/page/search/index", {
            titlePage: req.query.keyword,
            product: product
            
        });
    }
}
    
