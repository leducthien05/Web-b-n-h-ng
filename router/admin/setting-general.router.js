const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const controller = require("../../controller/admin/setting-general.controller");
const uploadImage = require("../../middleware/admin/uploadCloud.middleware");

router.get("/general", controller.index);

router.patch("/general", 
    upload.single("logo"), 
    uploadImage.uploadSigleImage, 
    controller.Update
);

module.exports = router;