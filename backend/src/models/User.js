const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: String,
});

// (mongoose.model("nome", schema))
module.exports = mongoose.model('User', UserSchema);