const { User } = require('../../models');
const { Conflict } = require("http-errors");

const signup = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (user) {
        throw new Conflict("Email in use");
    }

    const newUser = await User.create({ email, password });
    res.status(201).send(newUser);
};

module.exports = signup;

