
const express = require('express')
const User = require('../models/user')
const logger = require('../logger')
const router = express.Router()

router.get('/', async (req, res, next) => {
	try {
        const {username} = req.auth
		const user = await  User.findOne({
            username,
			resetPasswordExpires: {$gte:Date.now()}
		})
         
		if (user == null) {
			logger.error(`Le lien de ${username} est invalide ou a expiré !`)
			res.status(403).json({message:'Le lien est invalide ou a expiré !'})
		} else {
			res.status(200).json({
				message: 'Le lien est valide !',
			})
		}
          
	} catch (error) {
		logger.error(`Error :${error.message}`)
		res.status(500).json({message: error.message})
	}
})

module.exports = router
