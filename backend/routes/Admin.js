const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const logger = require('../logger')
const db = mongoose.connection

router.post('/', async (req, res, next) => {
    try {
    const data = req.body
    await db.collection("users").updateOne({username: data.username}, {$set: {isAdmin: true}});
    res.status(200).json({message: `${data.username} est devenu admin.`});
	logger.info(`${data.username} est devenu admin.`)

 } catch (error) {
    logger.error(`Error : ${error.message}`)
    res.status(500).json({message: error.message})
    }
})

module.exports = router