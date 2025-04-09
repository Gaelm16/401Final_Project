const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginAttemptSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    loginTime: {
        type: Date
    },
    logOutTime: {
        type: Date
    }
},
   
)

const Attempt = mongoose.model("Login_Attempt", loginAttemptSchema)
module.exports = Attempt