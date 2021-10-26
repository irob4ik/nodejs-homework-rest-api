const { User } = require('../../models');

const current = async (req, res) => {
    const { _id } = req.user;
    try {
        const user = await User.findById(_id);
        if (user) {
            return res.send(user);
        }
        res.status(404).send({ message: 'Not found' });            
    } catch (error) {
        res.status(404).send({ message: 'Not found' });
    }
}

module.exports = current;