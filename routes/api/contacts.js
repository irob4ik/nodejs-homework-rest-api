const express = require('express');
const router = express.Router();

const {controllerWrapper, validation, authenticate} = require("../../middlewares");

const { addSchema, patchSchema, favoriteSchema } = require('../../models/contact');
const {contactsControllers: ctrl} = require("../../controllers");

// GET contact list //
router.get("/", authenticate, controllerWrapper(ctrl.getAll));

// // GET contact by ID //
router.get("/:contactId", authenticate, controllerWrapper(ctrl.getById));

// ADD contact to list //
router.post("/", authenticate, validation(addSchema), controllerWrapper(ctrl.add));

//DELETE contact //
router.delete("/:contactId", authenticate, controllerWrapper(ctrl.removeById));

// UPDATE contact //
router.patch("/:contactId", authenticate, validation(patchSchema), controllerWrapper(ctrl.updateById));

// FAVORITE contact //
router.patch("/:contactId/favorite", authenticate, validation(favoriteSchema), controllerWrapper(ctrl.updateFavById));

module.exports = router
