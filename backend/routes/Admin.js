const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const db = mongoose.connection

router.post('/', async (req, res, next) => {
    const data = req.body
    await db.collection("users").updateOne({username: data.username}, {$set: {isAdmin: true}});
    res.send("Admin added");
})

module.exports = router