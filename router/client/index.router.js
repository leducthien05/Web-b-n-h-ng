const HomePage = require("./HomePage.router");
const Product = require("./product.router");

const categoryMiddleware = require("../../middleware/client/category.middleware");

module.exports = (app) =>{
    app.use(categoryMiddleware.category)
    app.use("/", HomePage);
    app.use("/product", Product);
};

