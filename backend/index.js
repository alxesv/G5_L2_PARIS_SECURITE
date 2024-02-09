require("dotenv").config()
const express = require("express")
const app = express()
app.use(express.json({strict: false}))
const port = 3000
const mongoose = require("mongoose")
const { auth } = require("./middlewares/auth")
const helmet = require("helmet");

app.use(helmet())
// app.use(
// 	helmet.contentSecurityPolicy({
// 	  directives: {
// 		defaultSrc: ["'self'"],
// 		scriptSrc: ["'self'", 'http://localhost:8000'],
// 		// Add other directives as needed
// 	  },
// 	})
//   );

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Connected to mongodb !"))
	.catch((err) => console.log("Error : ", err))
	    app.use(express.json())
app.get("/", (req, res) => {
	 res.send("Hello World!")
})

app.listen(port, () => {
	  console.log(`Example app listening on port ${port}`)
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
app.use('/admin',auth, require('./routes/Admin.js'))
