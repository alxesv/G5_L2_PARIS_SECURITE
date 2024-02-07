const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String, required: true
    },
    password:{
        type: String, required: true
    },
    isAdmin:{
        type: Boolean, default: false
    },
    allergies:{
        type: String, required: true,
        type: Boolean, default: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User