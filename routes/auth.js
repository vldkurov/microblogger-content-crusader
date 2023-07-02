const express = require('express');

const validate = require('../middleware')

const {schemas} = require('../models')

const {headers, authenticate} = require('../middleware')

const router = express.Router();

const ctrl = require('../controls')

// signup
router.post('/signup', validate.body(schemas.signupSchema), ctrl.signup)

// signin
router.post('/signin', validate.body(schemas.signinSchema), ctrl.signin)

// current
router.get('/current', headers, authenticate, ctrl.current)

// logout
router.post('/logout', headers, authenticate, ctrl.logout)

// sample
// router.get('/sample', (req, res) => {
//     res.render('pages/author/sample.html')
// })


module.exports = router