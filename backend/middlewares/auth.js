const jwt = require('jsonwebtoken')
const logger = require('../logger')

exports.auth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1]
		if(!token){
			return res.status(401).json({message: "Vous n'êtes pas autorisé à y accéder !", invalid: true})

		}
		jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
			if(err || !decoded){
				return res.status(401).json({message: "Invalid token !", invalid:true})
			}
            const {username, isAdmin} = decoded
		
        req.auth = {
            username, isAdmin
        }
		next()
    })
	} catch (error) {
		logger.error('Error: '+error.message)
		res.status(500).json(error)
	}
}