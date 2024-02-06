const express = require('express')
const Product = require('../models/user')
const router = express.Router()

router.post('/', (req, res, next) => {
   
    res.send("Register")
})

module.exports = router