require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require('../../models');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
   const { email, password } = req.body;
    const user = await User.findOne({ email });    
    if (!user) {
        return res.status(401).json({ message: "Email or password is wrong" });
    }

    const isCrrectPassword = bcrypt.compareSync(password, user.password);
    if (!isCrrectPassword) {
        return res.status(401).json({ message: "Email or password is wrong" });
    }

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY);

    await User.findByIdAndUpdate(user._id, { token });
    
    res.status(200).send(user);     
}

module.exports = login;