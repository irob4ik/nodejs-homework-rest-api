const express = require('express');
const router = express.Router();

const {controllerWrapper, validation, authenticate} = require('../../middlewares');

const { userSchema } = require("../../models/user");
const {authControllers: ctrl} = require("../../controllers");

// POST /api/users/register
router.post("/signup", validation(userSchema), controllerWrapper(ctrl.register));

// POST /api/users/login
router.post("/login", validation(userSchema), controllerWrapper(ctrl.login));

// GET /api/users/logout
router.get("/logout", authenticate, controllerWrapper(ctrl.logout));

// GET /api/users/current
router.get("/current", authenticate, controllerWrapper(ctrl.current));

module.exports = router;