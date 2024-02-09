const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const logger = require('../logger')
const { body } = require('express-validator')
const { verifyInputs } = require('../middlewares/verifyInputs')
const db = mongoose.connection
const validateInputs = [
	body('isPrivate').optional().trim().isLength({ min: 2 }).escape(),
	body('allergy').trim().isLength({ min: 2 }).escape(),
  ];

router.post('/', validateInputs, verifyInputs, async (req, res, next) => {
	try {
	let priv = false
	const data =req.body
	if (data.hasOwnProperty("isPrivate") && data.isPrivate === "on") {
		priv = true
	}
	const allergy = {
		allergy: data.allergy,
		isPrivate: priv
	}
	const currentUser = await db.collection("users").findOne({username: req.auth.username})
	let alreadyExists = false
    
	if (currentUser.allergies) {
		for (let i = 0; i < currentUser.allergies.length; i++) {
			if (currentUser.allergies[i].allergy === allergy.allergy) {
				logger.info(`L'allergie ${allergy.allergy} a déjà été créer par l'utilisateur ${req.auth.username}.`)
				alreadyExists = true
				return res.status(200).json({message: "Cette allergie existe déjà !"})
			}
		}
	}

	if (!alreadyExists) {
		await db.collection("users").updateOne({username:req.auth.username}, {$addToSet: {allergies: allergy}})
		logger.info(`Allergie ${allergy.allergy} ajouter à l'utilisateur ${req.auth.username}.`)

	}

	res.status(200).json({message: "Allergie ajoutée !"})
} catch (error) {
	logger.error(`Error : ${error.message}`)
    res.status(500).json({message: error.message})	
}
})

module.exports = router