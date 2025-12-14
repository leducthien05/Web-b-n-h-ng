const express = require("express");
const router = express.Router();
const multer = require('multer');
// const storage = require("../../helper/ImageStorage");

const upload = multer();
const validate = require("../../validates/admin/product.validate");
const uploadImage = require("../../middleware/admin/uploadCloud.middleware");

const controller = require("../../controller/admin/products.controller");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.change_status);

router.patch("/change-multi-status", controller.change_multi);

router.delete("/delete/:id", controller.delete);

router.get("/create", controller.create);

router.post("/create",
    upload.single("image"),
    uploadImage.uploadSigleImage,
    validate.create,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
    upload.single("image"),
    validate.edit,
    controller.editPatch
);

router.get("/detail/:id", controller.detail);


module.exports = router;