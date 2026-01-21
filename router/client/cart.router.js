const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/cart.controller");

router.get('/', controller.cart);

router.post("/add/:id", controller.addPost);

router.get("/delete/:Productid", controller.delete);

router.get("/edit/quantity/:idProduct/:newQuantity", controller.editQuantity);

module.exports = router;