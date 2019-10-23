const User = require("../models/User");
const Spot = require("../models/Spot");

module.exports = {

    async index(req, res) {
        const { tech } = req.query; // busca o/os campos da queryString
        const spots = await Spot.find({ techs: tech }); // busca um valor no campo 'techs' (padrão do mongodb)
        return res.json(spots)
    },
    // create a spot
    async store(req, res) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        if (user_id.length > 24) {
            return res.status(400).json({ error: "The 'user_id' length is too big." })
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ error: "User doesn't exists." });
        }

        const spot = await Spot.create({
           user: user_id,
           thumbnail: filename,
           company,
           techs: techs.split(',').map(tech => tech.trim()),
           price
        });
        
        return res.json(spot)
    }
}