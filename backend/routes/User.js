const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const db = mongoose.connection

router.post('/', async (req, res, next) => {
    if(req.body.username) {
        const user = await db.collection("users").findOne({username
            : req.body.username})
        res.send(JSON.stringify(user))
        return
    }
    res.status(404).json({message: "No user found", status: 404})

})

module.exports = router