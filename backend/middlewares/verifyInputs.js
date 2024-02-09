const { validationResult } = require("express-validator");

exports.verifyInputs = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Il y a problèmes avec les entrées"});
    }
    next()
}