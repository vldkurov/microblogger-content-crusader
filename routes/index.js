const authRouter = require('./auth')
const readerRouter = require('./reader')
const mainRouter = require('./main');
const authorRouter = require('./author');
const userRouter = require('./user')


module.exports = {mainRouter, authRouter, authorRouter, readerRouter, userRouter};