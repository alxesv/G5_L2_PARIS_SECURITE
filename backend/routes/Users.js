const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const logger = require('../logger')
const { auth } = require('../middlewares/auth')
const { body } = require('express-validator')
const { verifyInputs } = require('../middlewares/verifyInputs')
const db = mongoose.connection
const validateInputs = [
	body('username').trim().isLength({ min: 2 }).escape(),
  ];
router.post('/', auth, validateInputs, verifyInputs, async (req, res, next) => {
    try {
    if(req.body.username) {
        const user = await db.collection("users").findOne({username
            : req.body.username})
        logger.info(`Récupération des infos de l'utilisateur ${req.body.username}`)
        return res.status(200).json(user)
    }
    res.status(404).json({message: "No user found", status: 404})
} catch (error) {
    logger.error(`Error : ${error.message}`)
    res.status(500).json({message: error.message})	
}
})

router.get('/', async (req, res, next) => {
    try {
    const users = await db.collection("users").find().toArray()
    logger.info(`Récupération des infos de tous les utilisateurs`)
    res.status(200).json(users)
} catch (error) {
    logger.error(`Error : ${error.message}`)
    res.status(500).json({message: error.message})	
    }
})

module.exports = router