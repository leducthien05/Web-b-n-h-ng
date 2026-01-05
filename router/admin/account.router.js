const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/account.validate");
const controller = require("../../controller/admin/account.controller");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", 
    upload.single("avatar"),
    uploadCloud.uploadSigleImage,
    validate.create,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id",
    upload.single("avatar"),
    uploadCloud.uploadSigleImage,
    validate.edit,
    controller.editPatch
);


module.exports = router;