const express = require("express");
const router = express.Router();
const multer  = require('multer');
const storage = require("../../helper/ImageStorage");
const upload = multer({storage: storage()});
const validate = require("../../validates/admin/product.validate");

const controller = require("../../controller/admin/products.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.change_status);

router.patch("/change-multi-status", controller.change_multi);

router.delete("/delete/:id", controller.delete);

router.get("/create", controller.create);

router.post("/create",
    upload.single("image"),
    validate.create, 
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
    upload.single("image"),
    validate.edit,
    controller.editPatch);


module.exports = router;