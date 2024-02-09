const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const logger = require('../logger')
const { body } = require('express-validator')
const { verifyInputs } = require('../middlewares/verifyInputs')
const router = express.Router()
const validateInputs = [
	body('password').trim().isLength({ min: 8 }).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/),
  ];
router.patch('/', validateInputs, verifyInputs, async (req, res, next) => {
	try {
		const {username} = req.auth
		const {password} = req.body
		const user = await User.findOne({username,  resetPasswordExpires: 
            {$gte:Date.now()}
		})
		if(!user) return  res.status(403).json({message:'L\'utilisateur n\'existe pas !'})
		const hashedPassword = await bcrypt.hash(password, 10)

		await User.updateOne({username},{
			password: hashedPassword,
			resetPasswordExpires: null,
		})
             
		logger.info(user.username + ' : Mot de passe mis à jour')
		res.status(200).send({ message: 'Mot de passe mis à jour' })
              

		
	} catch (error) {
		logger.error(`Error : ${error.message}`)
		res.status(500).json({message: error.message})
	}
})

module.exports = router
