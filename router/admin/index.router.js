const systemConfig = require("../../config/system");
const middlewareAuth = require("../../middleware/admin/auth.middleware");

const dashboardRouter = require("./dashboard.router");
const productsRouter = require("./products.router");
const categoryProductRouter = require("./category-products.router");
const roleRouter = require("./roles.router");
const accountRouter = require("./account.router");
const authRouter = require("./auth.router");
const myaccountRouter = require("./my-account.router");

module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", middlewareAuth.requireAuth, dashboardRouter);
    app.use(PATH_ADMIN + "/products", middlewareAuth.requireAuth, productsRouter);
    app.use(PATH_ADMIN + "/products-category", middlewareAuth.requireAuth, categoryProductRouter);
    app.use(PATH_ADMIN + "/roles", middlewareAuth.requireAuth,roleRouter);
    app.use(PATH_ADMIN + "/accounts", middlewareAuth.requireAuth,accountRouter);
    app.use(PATH_ADMIN + "/auth", authRouter);
    app.use(PATH_ADMIN + "/my-account",middlewareAuth.requireAuth, myaccountRouter);
    


}