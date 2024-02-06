const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
   
    res.send("Register")
})

module.exports = router