const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/chat.controller");

const chatMiddleware = require("../../middleware/client/chat.middleware");

router.get('/:roomchatID', chatMiddleware.chat, controller.chat);

module.exports = router;