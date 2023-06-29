const {ctrlWrapper} = require("../../helpers");

const {authenticate} = require('../../middleware')
const draft = async (req, res, next) => {

    let params = ['Draft', authenticate()]
    let sql = "INSERT INTO articles (created, modified, status, author_id) VALUES (datetime('now', 'localtime'), datetime('now', 'localtime'), ?, ?)"

    await db.run(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else {
            res.redirect(`/author/article/edit?id=${this.lastID}`)
        }
    })
}

module.exports = {
    draft: ctrlWrapper(draft)
}