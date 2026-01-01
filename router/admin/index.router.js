const systemConfig = require("../../config/system");

const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const categoryProductRouter = require("./category-products.router");
const roleRouter = require("./roles.router");

module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/products", productsRouter);
    app.use(PATH_ADMIN + "/products-category", categoryProductRouter);
    app.use(PATH_ADMIN + "/roles", roleRouter);


}