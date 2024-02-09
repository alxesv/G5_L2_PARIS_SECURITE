const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const logger = require('../logger')
const { auth } = require('../middlewares/auth')
const { body } = require('express-validator')
const { verifyInputs } = require('../middlewares/verifyInputs')
const db = mongoose.connection

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