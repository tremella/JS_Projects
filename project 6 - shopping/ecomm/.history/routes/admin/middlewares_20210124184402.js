const { validationResult } = require('express-validator');

//reducing duplication for error handling and resending page templates within route handlers
module.exports = {
    handleErrors(templateFunc) {
        // returning a function
        // middleware involves a NEXT (to help it continue)
        return (req, res, next) => {
            const errors = validationResult(req);
            // if errors:
            if (!errors.isEmpty()) {
                console.log('here')
                return res.send(templateFunc({ errors }));
            }
            // if no errors:
            next();
        };
    }
    requireAuth(req,res,next) {
        if (!req.session.userId) {
            return res.redirect('/signin')
        }
    }
};
