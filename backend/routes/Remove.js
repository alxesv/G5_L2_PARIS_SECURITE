const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const logger = require('../logger')
const { body } = require('express-validator')
const { verifyInputs } = require('../middlewares/verifyInputs')
const db = mongoose.connection
const validateInputs = [
	body('allergy').trim().isLength({ min: 2 }).escape(),
	body('username').trim().isLength({ min: 2 }).escape(),
  ];
router.post('/', validateInputs, verifyInputs, async (req, res, next) => {
    try {
    const data = req.body
    const allergy = {
        allergy: data.allergy
    }
    await db.collection("users").updateOne({username: data.username}, {$pull: {allergies: allergy}});
    res.status(200).json({message: "Removed allergy"});
	logger.info(`l'allergie ${data.allergy} de l'utilisateur ${data.username} a été supprimé.`)

} catch (error) {
    logger.error(`Error : ${error.message}`)
    res.status(500).json({message: error.message})
    }
})

module.exports = router