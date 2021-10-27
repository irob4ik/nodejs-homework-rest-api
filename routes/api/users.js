const express = require('express');
const router = express.Router();

const {controllerWrapper, authenticate, upload} = require('../../middlewares');
const {usersControllers: ctrl} = require("../../controllers");

// PATCH /api/users/avatars
router.patch("/avatars", authenticate, upload.single("avatar"), controllerWrapper(ctrl.updateAvatar));

module.exports = router;