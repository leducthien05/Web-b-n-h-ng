const HomePage = require("./HomePage.router");
const Product = require("./product.router");

module.exports = (app) =>{
    app.use("/", HomePage);
    app.use("/product", Product);
};

