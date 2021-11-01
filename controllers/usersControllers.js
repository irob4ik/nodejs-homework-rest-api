const { User } = require("../models/user");
const { sendEmail } = require('../helpers');
const path = require("path");
const fs = require('fs');

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempDir, originalname } = req.file;
    const [extension] = originalname.split(".").reverse();
    const filename = `${_id}.${extension}`;
    const uploadDir = path.join(__dirname, "../", "public\\avatars", filename);
    
    try {
        await fs.rename(tempDir, uploadDir, () => {
            console.log("\nFile Moved!\n");
        });
        const image = path.join("avatars", filename);
        await User.findByIdAndUpdate(_id, { avatarURL: image });
        res.status(201).send({ message: 'Update avatar success' });
    } catch (error) {
        await fs.unlink(tempDir);
        next(error);
    }
};

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verifyToken: verificationToken });

    if (!user) {
        res.status(404).send({ message: 'User not found' });
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: null });

    res.status(200).send({ message: 'Verification successful' });
};

const verifyRepeat = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        res.status(404).send({ message: 'missing required field email' });
    }

    const user = await User.findOne({ email });
    if (user.verify) {
        res.status(404).send({ message: 'Verification has already been passed' });
    }

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
    res.status(200).send({ message: 'Verification email sent' });
}

module.exports = {
    updateAvatar,
    verify,
    verifyRepeat
}
