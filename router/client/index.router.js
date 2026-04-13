const HomePage = require("./HomePage.router");
const Product = require("./product.router");
const Search = require("./search.router");
const Cart = require("./cart.router");
const Checkout = require("./checkout.router");
const User = require("./user.router");
const Chat = require("./chat.router");
const Friend = require("./friend.router")

const categoryMiddleware = require("../../middleware/client/category.middleware");
const cartMiddleware = require("../../middleware/client/cart.middleware");
const infoUserMiddlware = require("../../middleware/client/user.middleware");
const settingMiddleware = require("../../middleware/client/setting.middleware");
const authMiddleware = require("../../middleware/client/auth.middleware");


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
    app.use("/chat", authMiddleware.requireAuth, Chat);
    app.use("/friend",authMiddleware.requireAuth ,Friend);
};

