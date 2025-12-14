const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const controller = require("../../controller/admin/category-products.controller");
const uploadImage = require("../../middleware/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/category-products.validate")

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", 
    upload.single("image"),
    uploadImage.uploadSigleImage,
    validate.create,
    controller.createPost
)

module.exports = router;