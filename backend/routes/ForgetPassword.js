const express = require('express')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const router = express.Router()
const nodemailer = require("nodemailer")
const logger = require('../logger')

router.post('/', async (req, res, next) => {
	try {
		const {mail} = req.body
		const user = await User.findOne({mail})
		if(!user) return res.status(401).json({message: "Identifiant  invalide !"})
		const token = jwt.sign({username:user.username}, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
		await  User.updateOne({mail},{
			resetPasswordExpires: Date.now() + 3600000,
		})
		logger.info(`${user.username} mis à jour`)
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: "smtp.gmail.com",
			auth: {
				user: `${process.env.EMAIL_ADDRESS}`,
				pass: `${process.env.EMAIL_PASSWORD}`,
			},
		})
		const mailOptions = {
			from: `${process.env.EMAIL_ADDRESS}`,
			to: `${user.mail}`,
			subject: 'Link To Reset Password',
			text:
              'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
              + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
              + `http://localhost:8000/reset/${token}\n\n`
              + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
		}
		logger.info(`Mail envoyé à ${user.mail}`)
  
		transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				logger.error(`Error : ${err.message}`)
			} else {
				res.status(200).json({message:'Email de réinitialisation envoyé'})
			}
		})
        
		
	} catch (error) {
		logger.error(`Error : ${error.message}`)
		res.status(500).json({message: error.message})
	}
})

module.exports = router
