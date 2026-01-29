const express = require("express");
const router = express.Router();

const controller = require("../../controller/client/user.controller");
const validate = require("../../validates/client/user.validate");


router.get("/register", controller.register);

router.post("/register",validate.register, controller.registerPost);

router.get("/login", controller.login);

router.post("/login", validate.login, controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", validate.forgotPassword, controller.forgotPasswordPost);

router.get("/password/otp", controller.otpGet);

router.post("/password/otp", controller.otpPost);

router.get("/password/reset-password", controller.resetPassword);

router.post("/password/reset-password",validate.resetPassword, controller.resetPasswordPost);

module.exports = router;