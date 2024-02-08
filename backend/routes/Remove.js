const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const logger = require('../logger')
const db = mongoose.connection

router.post('/', async (req, res, next) => {
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