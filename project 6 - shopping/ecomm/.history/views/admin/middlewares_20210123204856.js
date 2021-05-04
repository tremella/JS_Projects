const { validationResult } = require('express-validator')

//reducing duplication for error handling and resending page templates within route handlers
module.exports = {
    handErrors(templateFunc) {
        // returning a function
        // middleware involves a NEXT (to help it continue)
        return (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send(templateFunc)
            }
        }
    }
}