const { validationResult } = require('express-validator')

//reducing duplication for error handling and resending page templates within route handlers
module.exports = {
    handErrors(templateFunc) {
        // returning a function
        return (req, res, next) => {

        }
    }
}