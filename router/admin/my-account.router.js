const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/account.validate");

const controller = require("../../controller/admin/my-account.controller");

router.get("/", controller.detail);

router.get("/edit", controller.edit);

router.patch(
    "/edit",
    upload.single("avatar"),
    validate.edit,
    controller.editPatch
)

module.exports = router;