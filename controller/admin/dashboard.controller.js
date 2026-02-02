const Product = require("../../model/product.model");
const Category = require("../../model/category-product.model");
const User = require("../../model/user.model");
const Account = require("../../model/account.model");

module.exports.dashboard = async (req, res)=>{
    const statistic = {
        CategoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        Product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        Account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        User: {
            total: 0,
            active: 0,
            inactive: 0
        },
    }
// Category
    statistic.CategoryProduct.total = await Category.countDocuments({
        deleted: false
    });
    statistic.CategoryProduct.active = await Category.countDocuments({
        deleted: false,
        status: "active"
    });
    statistic.CategoryProduct.inactive = await Category.countDocuments({
        deleted: false,
        status: "inactive"
    });
//  Product
    statistic.Product.total = await Product.countDocuments({
        deleted: false
    });
    statistic.Product.active = await Product.countDocuments({
        deleted: false,
        status: "active"
    });
    statistic.Product.inactive = await Product.countDocuments({
        deleted: false,
        status: "inactive"
    });
//  Account
    statistic.Account.total = await Account.countDocuments({
        deleted: false
    });
    statistic.Account.active = await Account.countDocuments({
        deleted: false,
        status: "active"
    });
    statistic.Account.inactive = await Account.countDocuments({
        deleted: false,
        status: "inactive"
    });
//  User
    statistic.User.total = await User.countDocuments({
        deleted: false
    });
    statistic.User.active = await User.countDocuments({
        deleted: false,
        status: "active"
    });
    statistic.User.inactive = await User.countDocuments({
        deleted: false,
        status: "inactive"
    });
    res.render("admin/page/dashboard/index", {
        titlePage: "Trang tổng quan",
        statistic: statistic
    })
}