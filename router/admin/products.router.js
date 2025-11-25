const express = require("express");
const router = express.Router();

const controller = require("../../controller/admin/products.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.change_status);

router.patch("/change-multi-status", controller.change_multi);


module.exports = router;