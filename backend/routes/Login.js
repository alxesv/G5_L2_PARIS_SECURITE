const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../logger')
const router = express.Router()

router.post('/', async (req, res, next) => {
	try {
		const {password, username} = req.body
		const user = await User.findOne({username})
		if(!user) return res.status(401).json({message: "Identifiant /Mot de passe invalide !"})
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if(!isPasswordValid) return res.status(401).json({message: "Identifiant /Mot de passe invalide !"})
		const accessToken = jwt.sign({username:user.username, isAdmin: user.isAdmin}, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
		logger.info(`${user.username} s'est connecté.`)
		res.status(201).json({message: "Connexion réussi", accessToken})
		
	} catch (error) {
		logger.error(`Error : ${error.message}`)
		res.status(500).json({message: error.message})
	}
})

module.exports = router
