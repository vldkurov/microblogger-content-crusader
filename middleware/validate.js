const {validationResult} = require('express-validator');

const body = validations => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (result.errors.length) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).render('pages/error.html', {
            status: 400,
            errors: errors.array()
        })
    };
};

module.exports = {body};