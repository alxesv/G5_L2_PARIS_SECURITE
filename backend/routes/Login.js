const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/', async (req, res, next) => {
	try {
		const {password, name} = req.body
		const user = await User.findOne({name})
		if(!user) return res.status(401).json({message: "Identifiant /Mot de passe invalide !"})
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if(!isPasswordValid) return res.status(401).json({message: "Identifiant /Mot de passe invalide !"})
		const accessToken = jwt.sign({name:user.name}, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
		res.status(201).json({message: "Connexion réussi", user: {name:user.name}, accessToken})
		
	} catch (error) {
		console.log("Error : " , error)
		res.status(500).json({message: error.message})
	}
})

module.exports = router
