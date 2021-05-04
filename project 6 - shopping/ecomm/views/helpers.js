module.exports = {
    // making this to handle failed signin
    // prop = property that it failed on (email or pw)
    getError(errors, prop) {
        try{
            return errors.mapped()[prop].msg;
            // returns a [{}] assigning an msg (message) field where the error is mapped
        } catch (err) {
            return '';
        }
    }
};