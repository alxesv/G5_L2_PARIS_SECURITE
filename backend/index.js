require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.json({strict: false}))
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
app.use("/submit", require("./routes/Submit"))
app.use("/users", require("./routes/Users.js"))
app.use("/remove", require("./routes/Remove.js"))
app.use('/admin', require('./routes/Admin.js'))