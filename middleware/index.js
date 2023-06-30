const authenticate = require('./authenticate')
const {body} = require('./validate')

module.exports = {
    authenticate,
    body,
}