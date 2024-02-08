const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		if(!token){
			return res.status(401).json({message: "Vous n'êtes pas autorisé à y accéder !"})

		}
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
			if(err || !decoded){
				return res.status(401).json({message: "Invalid token !"})
			}
            const {username, isAdmin} = decoded
		
        req.auth = {
            username, isAdmin
        }
		next()
    })
	} catch (error) {
		console.log(error)
		res.status(500).json(error)
	}
}