const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginAttemptSchema = new mognnose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
    {timestamps: true}
)

const Attempt = mongoose.model("Login_Attempt", loginAttemptSchema)
module.exports = Attempt