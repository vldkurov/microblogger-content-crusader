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

        res.status(400).json({errors: errors.array()});
        // res.status(400).render('pages/error.html', {
        //     status: 400,
        //     errors: errors.array()
        // })
    };
};

// const email = () => {
//     return async (req, res, next) => {
//         const errors = validationResult(req)
//         if (!errors.isEmpty()) {
//             // return res.send(signupTemplet({errors}))
//             return res.json({errors})
//         }
//             // const {email, password} = req.body
//             // await repo.create({email, password})
//         // res.send('Sign Up successfully')
//         else if (errors.isEmpty()) {
//             return next();
//         }
//     }
// }

module.exports = {body};