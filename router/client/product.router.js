const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/product.controller");

router.get("/", controller.product);

router.get("/category/:slug", controller.category);


router.get("/detail/:slugProduct", controller.detail);

module.exports = router;