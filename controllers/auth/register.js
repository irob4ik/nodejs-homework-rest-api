const bcrypt = require("bcryptjs");

const { User } = require('../../models');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "Email in use" });
    }

    const hashpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({ email, password: hashpassword });
    res.status(201).send(newUser);
}

module.exports = register;