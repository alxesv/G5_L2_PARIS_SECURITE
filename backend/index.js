require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to mongodb !"))
    .catch((err) => console.log("Error : ",err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use("/register", require("./routes/Register"))
app.use("/login", require("./routes/Login"))
app.use("/allergies", require("./routes/Allergies"))