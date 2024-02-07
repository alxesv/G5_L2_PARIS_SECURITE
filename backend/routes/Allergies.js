const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const db = mongoose.connection

router.get('/', async (req, res, next) => {
    const users = await db.collection("users").find().toArray()
    console.log(users)
    res.send(users)
})

module.exports = router