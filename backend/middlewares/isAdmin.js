const logger = require("../logger")

exports.isAdmin =(req, res, next) =>{
    try {
        const {isAdmin, username} = req.auth
        if(isAdmin === true ){
            next()
        }else{
		logger.error('Accès interdit à ', username )
        res.status(403).json({message: "Vous n'êtes pas autoriser à accéder à cette route !"})
        }
    } catch (error) {
		logger.error('Error: '+error.message)
        res.status(500).json(error)
    }
}