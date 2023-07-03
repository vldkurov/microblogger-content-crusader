const express = require('express');

const {schemas} = require('../models')

const {headers, validate, authenticate} = require('../middleware')

const router = express.Router();

const ctrl = require('../controls')

// signup
router.post('/signup', validate(schemas.signupSchema), ctrl.signup)

// signin
router.post('/signin', validate(schemas.signinSchema), ctrl.signin)

// current
router.get('/current', headers, authenticate, ctrl.current)

// logout
router.post('/logout', headers, authenticate, ctrl.logout)

module.exports = router