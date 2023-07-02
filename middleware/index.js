const authenticate = require('./authenticate')
const {body} = require('./validate')
const headers = require('./headers')

module.exports = {
    authenticate,
    body,
    headers
}