const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/friend.controller");
const validate = require("../../validates/client/user.validate");
const middleware = require("../../middleware/client/auth.middleware");

router.get("/not-friend", controller.notFriend);
router.get("/request-friend", controller.reqFriend);
router.get("/accept-friend", controller.acceptFriend);
router.get("/", controller.index);

module.exports = router;