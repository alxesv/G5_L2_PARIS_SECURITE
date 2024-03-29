require("dotenv").config()
const express = require("express")
const app = express()
const port = 3000
const mongoose = require("mongoose")
const { auth } = require("./middlewares/auth")
const logger = require("./logger.js")
const { isAdmin } = require("./middlewares/isAdmin.js")
const helmet = require("helmet")

app.use(helmet())

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => logger.info("Connected to mongodb !"))
	.catch((err) => logger.error("Error : ", err.message))
app.use(express.json({strict: false}))
app.get("/", (req, res) => {
	 res.send("Hello World!")
})
app.listen(port, () => {
	  logger.info(`Example app listening on port ${port}`)
})

app.use("/register", require("./routes/Register"))
app.use("/login", require("./routes/Login"))
app.use("/forgetPassword", require("./routes/ForgetPassword.js"))
app.use("/reset",auth, require("./routes/Reset.js"))
app.use("/verifyLinkReset",auth, require("./routes/verifyLinkReset.js"))
app.use("/submit", auth,require("./routes/Submit"))
app.use("/users", require("./routes/Users.js"))
app.use("/user",auth, require("./routes/User.js"))
app.use("/remove",auth, require("./routes/Remove.js"))
app.use('/admin',auth, isAdmin,require('./routes/Admin.js'))
