const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/homepage.controller");

router.get('/', controller.homepage);

module.exports = router;