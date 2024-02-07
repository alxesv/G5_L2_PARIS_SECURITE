const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const db = mongoose.connection

router.post('/', async (req, res, next) => {
    let private = false
    const data = JSON.parse(req.body)
    if (data.hasOwnProperty("isPrivate") && data.isPrivate === "on") {
        private = true
    }
    const allergy = {
        allergy: data.allergy,
        isPrivate: private
    }

    const currentUser = await db.collection("users").findOne({username: "alex"})
    let alreadyExists = false
    
    if (currentUser.allergies) {
        for (let i = 0; i < currentUser.allergies.length; i++) {
            if (currentUser.allergies[i].allergy === allergy.allergy) {
                console.log("Allergy already exists")
                res.send("Allergy already exists")
                alreadyExists = true
                return
            }
        }
    }

    if (!alreadyExists) {
        await db.collection("users").updateOne({username: "alex"}, {$addToSet: {allergies: allergy}})
        console.log("Allergy added")
    }

    res.send("Submitted")
})

module.exports = router