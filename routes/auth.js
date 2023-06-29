const express = require('express');

const {validate} = require('../middleware')

const {schemas} = require('../models')

const router = express.Router();

const ctrl = require('../controls')

// signup
router.post('/signup',
    // validate(schemas.signupSchema),
    ctrl.signup)

// signin
// router.post('/signin', validateBody(schemas.signinSchema), ctrl.signin)

// logout
// router.post('/logout', ctrl.logout)

// sample
// router.get('/sample', (req, res) => {
//     res.render('pages/author/sample.html')
// })


module.exports = router