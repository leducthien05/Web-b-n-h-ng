const HomePage = require("../client/HomePage.router");

module.exports = (app) =>{
    app.use("/", HomePage);
};

