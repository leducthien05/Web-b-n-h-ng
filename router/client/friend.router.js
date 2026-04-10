const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/friend.controller");
const validate = require("../../validates/client/user.validate");
const middleware = require("../../middleware/client/auth.middleware");

router.get("/", controller.notFriend);

module.exports = router;