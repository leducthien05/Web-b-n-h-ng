const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/cart.controller");

router.get('/', controller.cart);

router.get("/add/:id", controller.create);

module.exports = router;