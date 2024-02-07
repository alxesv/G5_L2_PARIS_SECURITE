const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const router = express.Router()

router.post("/", async (req, res, next) => {
	try {
		const { password, username } = req.body
		const hashedPassword = await bcrypt.hash(password, 10)
		const userCreated = await User.create({
			username,
			password: hashedPassword
		})
		if (!userCreated) {
			res.status(404).json({
				message: "Il y a eu un problème lors de l'inscription"
			})
		}
		res.status(201).json({
			message: "Inscription réussi",
			user: {username:userCreated.username}
		})
	} catch (error) {
		console.log("Error : ", error.message)
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
