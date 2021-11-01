const bcrypt = require("bcryptjs");
const gravatar = require('gravatar');
const nanoid = require('nanoid');

const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({ message: "Email in use" });
    }

    const hashpassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);    
    const verifyToken = nanoid();

    const newUser = await User.create({
        email,
        password: hashpassword,
        avatarURL,
        verifyToken
    });

    const mail = {
        to: email,
        subject: "Verification on site",
        html: `<a
        target="_blank"
        href="http://localhost:4000/api/users/verify/${verifyToken}"
        >
        Click here to verify your email
        </a>`
    }

    sendEmail(mail);
    res.status(201).send(newUser);
}

module.exports = register;