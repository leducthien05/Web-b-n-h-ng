const HomePage = require("./HomePage.router");

module.exports = (app) =>{
    app.use("/", HomePage);
};

