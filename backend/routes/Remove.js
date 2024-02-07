const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const db = mongoose.connection

router.post('/', async (req, res, next) => {
    const data = req.body
    const allergy = {
        allergy: data.allergy
    }
    await db.collection("users").updateOne({username: data.username}, {$pull: {allergies: allergy}});
    res.send("Removed");
})

module.exports = router