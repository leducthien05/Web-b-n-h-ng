const HomePage = require("./HomePage.router");
const Product = require("./product.router");
const Search = require("../../router/client/search.router");
const Cart = require("../client/cart.router");

const categoryMiddleware = require("../../middleware/client/category.middleware");

module.exports = (app) =>{
    app.use(categoryMiddleware.category)
    app.use("/", HomePage);
    app.use("/cart", Cart);
    app.use("/product", Product);
    app.use("/search", Search);
};

