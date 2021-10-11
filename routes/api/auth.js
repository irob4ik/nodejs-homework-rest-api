const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require('../../models');

const { userSchema } = require("../../models/user");
const { signup, login, logout } = require("../../controllers/auth/index");

// POST /api/auth/register
router.post("/signup", async (req, res) => {
    const validation = userSchema.validate(req.body);
    if (validation.error) {
        return res.status(400).json({ message: 'required field error' });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "Email in use" });
    }

    const hashpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({ email, password: hashpassword });
    res.status(201).send(newUser);
});


// POST /api/auth/login
router.post("/login", async (req, res) => {
    
});

// POST /api/auth/logout
router.get("/logout", async (req, res) => {
    
});


module.exports = router;