const { validationResult } = require('express-validator');

//reducing duplication for error handling and resending page templates within route handlers
module.exports = {
    handleErrors(templateFunc, dataCb) { //dataCallback
        // returning a function
        // middleware involves a NEXT (to help it continue)
        return (req, res, next) => {
            const errors = validationResult(req);
            // if errors:
            if (!errors.isEmpty()) {
                //dataCB is optional arg.
                let data; //now we an freely access the data variable outside the if statement
                if (dataCb) {
                    data = await dataCb(req);
                }
                return res.send(templateFunc({ errors }));
            }
            // if no errors:
            next();
        };
    },
    // this one is for making sure user is logged in before they can see products
    requireAuth(req,res,next) {
        if (!req.session.userId) {
            return res.redirect('/signin');
        }
        //and if everything is fine, next
        next();
    }
};

