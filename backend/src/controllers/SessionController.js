const User = require("../models/User");
/*
    Controllers Methods:
        - index (return a session list)
        - show (return a single session)
        - store (create a session)
        - update (update a session)
        - destroy (destroy a session)
*/
module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
};