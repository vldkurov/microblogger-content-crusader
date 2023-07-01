const {authorHome} = require('./authorHome')
const {edit} = require('./edit')
const {update} = require('./update')
const {draft} = require('./draft')
const {publish} = require('./publish')
const {settings} = require('./settings')
const {updateSettings} = require('./updateSettings')
const {remove} = require('./remove')


module.exports = {
    authorHome,
    edit,
    update,
    draft,
    publish,
    settings,
    updateSettings,
    remove
}