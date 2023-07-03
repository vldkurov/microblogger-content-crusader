const mainRouter = require('./main')
const authRouter = require('./auth')
const authorRouter = require('./author');
const readerRouter = require('./reader')

module.exports = {mainRouter, authRouter, authorRouter, readerRouter};