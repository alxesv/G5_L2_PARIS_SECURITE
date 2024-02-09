const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const logger = require('../logger')
const { body } = require('express-validator')
const { verifyInputs } = require('../middlewares/verifyInputs')
const db = mongoose.connection
const validateInputs = [
	body('username').trim().isLength({ min: 2 }).escape(),
  ];
router.post('/', validateInputs, verifyInputs, async (req, res, next) => {
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