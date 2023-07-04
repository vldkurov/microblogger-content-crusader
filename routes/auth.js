const express = require('express');

const {schemas} = require('../models')

const {headers, getCurrent, validate, authenticate} = require('../middleware')

const router = express.Router();

const ctrl = require('../controls')

// signup - inputs: name, email, password; output: register new user (author), insert record to table authors;
router.post('/signup', validate(schemas.signupSchema), ctrl.signup)

// signin - inputs: email, password; outputs: login user (author);
router.post('/signin', validate(schemas.signinSchema), ctrl.signin)

// current - check for current user (author) credentials;
router.get('/current', headers, authenticate, ctrl.current)

// logout - ends current user session;
router.post('/logout', headers, authenticate, ctrl.logout)

module.exports = router