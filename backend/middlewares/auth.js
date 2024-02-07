const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
	try {
		const token = req.headers.authorization
		if(!token){
			res.status(401).json({message: "Vous n'êtes pas autorisé à y accéder !"})

		}
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
			if(err || !decoded){
				res.status(401).json({message: "Invalid token !"})
			}
            const {name} = decoded
		
        req.auth = {
            name
        }
		next()
    })
	} catch (error) {
		res.status(500).json(error)
	}
}