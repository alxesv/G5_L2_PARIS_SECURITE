const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const logger = require("../logger")
const router = express.Router()

router.post("/", async (req, res, next) => {
	try {
		const { password, username, mail } = req.body
		const user = await  User.findOne().or([{mail}, {username}])
		if(user) return res.status(401).json({
			message: "L'utilisateur existe déjà !"
		})
		const hashedPassword = await bcrypt.hash(password, 10)
		const userCreated = await User.create({
			username,
			password: hashedPassword,
			mail: mail
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
		logger.info(`${userCreated.username} s'est inscrit.`)
	} catch (error) {
		logger.error(`Error : ${error.message}`)
		res.status(500).json({ message: error.message })
	}
})

module.exports = router
