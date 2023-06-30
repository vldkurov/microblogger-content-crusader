const {checkSchema, ExpressValidator, CustomValidationChain, CustomSchema} = require("express-validator");

const {checkEmailNotInUse} = require('../helpers')

const settingsSchema = checkSchema({
    title: {notEmpty: true},
    subtitle: {notEmpty: true},
    author: {notEmpty: true}
});

const signupSchema = checkSchema({
    name: {notEmpty: true, isString: true},
    email: {
        notEmpty: true,
        isEmail: {bail: true},
        trim: true,
        normalizeEmail: true,
        errorMessage: 'Must be a valid e-mail address'
    },
    password: {
        isEmpty: {negated: true},
        isLength: {options: {min: 6}},
        errorMessage: 'The password must be at least 6 characters'
    }
});

const signinSchema = checkSchema({
    email: {
        notEmpty: true,
        isEmail: {bail: true},
        trim: true,
        normalizeEmail: true,
        errorMessage: 'Must be a valid e-mail address'
    },
    password: {
        isEmpty: {negated: true},
        isLength: {options: {min: 6}},
        errorMessage: 'The password must be at least 6 characters'
    }
});

const schemas = {
    settingsSchema, signupSchema, signinSchema
}

module.exports = schemas

// errorMessage: 'The password must be at least 6 characters, and must contain a symbol'