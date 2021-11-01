const { User } = require("../models/user");
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

module.exports = {
    updateAvatar
}
