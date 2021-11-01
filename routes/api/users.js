const express = require('express');
const router = express.Router();

const {controllerWrapper, authenticate, upload} = require('../../middlewares');
const {usersControllers: ctrl} = require("../../controllers");

// PATCH /api/users/avatars
router.patch("/avatars", authenticate, upload.single("avatar"), controllerWrapper(ctrl.updateAvatar));

// GET /api/users/verify/:verificationToken
router.get("/verify/:verificationToken", controllerWrapper(ctrl.verify));

// POST /api/users/verify/
router.post("/verify/", controllerWrapper(ctrl.verifyRepeat));

module.exports = router;