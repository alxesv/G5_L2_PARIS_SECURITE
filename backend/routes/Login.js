const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const logger = require('../logger')
const { body } = require('express-validator')
const { verifyInputs } = require('../middlewares/verifyInputs')
const router = express.Router()
const validateInputs = [
	body('username').trim().isLength({ min: 2 }).escape(),
	body('password').trim().isLength({ min: 2 }).escape(),
  
  ];
router.post('/',validateInputs, verifyInputs, async (req, res, next) => {
	try {
		const {password, username} = req.body
		const user = await User.findOne({username})
		if(!user) return res.status(401).json({message: "Identifiant /Mot de passe invalide !"})
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if(!isPasswordValid) return res.status(401).json({message: "Identifiant /Mot de passe invalide !"})
		const accessToken = jwt.sign({username:user.username, isAdmin: user.isAdmin}, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
		logger.info(`${user.username} s'est connecté.`)
		const xsrfToken = require('crypto').randomBytes(32).toString('hex')
		res.status(201).json({message: "Connexion réussi", accessToken, xsrfToken})
		
	} catch (error) {
		logger.error(`Error : ${error.message}`)
		res.status(500).json({message: error.message})
	}
})

module.exports = router
