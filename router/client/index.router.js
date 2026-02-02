const HomePage = require("./HomePage.router");
const Product = require("./product.router");
const Search = require("../../router/client/search.router");
const Cart = require("../client/cart.router");
const Checkout = require("../client/checkout.router");
const User = require("../client/user.router");
const Chat = require("../client/chat.router");

const categoryMiddleware = require("../../middleware/client/category.middleware");
const cartMiddleware = require("../../middleware/client/cart.middleware");
const infoUserMiddlware = require("../../middleware/client/user.middleware");
const settingMiddleware = require("../../middleware/client/setting.middleware");

module.exports = (app) =>{
    app.use(categoryMiddleware.category);
    app.use(infoUserMiddlware.infoUser);
    app.use(cartMiddleware.cartID);
    app.use(settingMiddleware.setting);
    app.use("/", HomePage);
    app.use("/cart", Cart);
    app.use("/product", Product);
    app.use("/search", Search);
    app.use("/checkout", Checkout);
    app.use("/user", User);
    app.use("/chat", Chat);
};

