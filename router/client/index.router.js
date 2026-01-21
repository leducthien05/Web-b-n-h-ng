const HomePage = require("./HomePage.router");
const Product = require("./product.router");
const Search = require("../../router/client/search.router");
const Cart = require("../client/cart.router");
const Checkout = require("../client/checkout.router");

const categoryMiddleware = require("../../middleware/client/category.middleware");
const cartMiddleware = require("../../middleware/client/cart.middleware");

module.exports = (app) =>{
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartID);
    app.use("/", HomePage);
    app.use("/cart", Cart);
    app.use("/product", Product);
    app.use("/search", Search);
    app.use("/checkout", Checkout);
};

