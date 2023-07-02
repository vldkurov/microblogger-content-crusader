const mainRouter = require('./main')
const authRouter = require('./auth')
const readerRouter = require('./reader')
const authorRouter = require('./author');


module.exports = {mainRouter, authRouter, authorRouter, readerRouter};