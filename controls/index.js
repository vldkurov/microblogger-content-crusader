const {main} = require('./main')

const {
    signup,
    signin,
    current,
    logout
} = require('./auth')

const {
    authorHome,
    edit,
    update,
    draft,
    publish,
    settings,
    updateSettings,
    remove
} = require('./author')

const {readerHome, article, comment, like} = require('./reader')

module.exports = {
    main,
    signup,
    signin,
    current,
    logout,
    authorHome,
    edit,
    update,
    draft,
    publish,
    settings,
    updateSettings,
    remove,
    readerHome,
    article,
    comment,
    like
}