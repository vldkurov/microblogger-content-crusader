const {
    signup,
    signin,
    // logout
} = require('./auth')
const {
    home,
    edit,
    update,
    draft,
    publish,
    settings,
    updateSettings,
    remove
} = require('./author')

const {reader, article, comment, like} = require('./reader')

module.exports = {
    signup,
    signin,
    // logout,
    home,
    edit,
    update,
    draft,
    publish,
    settings,
    updateSettings,
    remove,
    reader,
    article,
    comment,
    like
}