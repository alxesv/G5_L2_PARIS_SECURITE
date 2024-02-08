const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	username: { type: String, unique : true, required : true, dropDups: true },
	password: { type: String, required: true },
	mail: { type: String, unique : true, required : true, dropDups: true},
	isAdmin: { type: Boolean, default: false },
	resetPasswordExpires:{ type: Date },
	allergies: { type: Object }
})
const User = mongoose.model("User", userSchema)

module.exports = User
