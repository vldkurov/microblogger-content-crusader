const {ctrlWrapper} = require("../../helpers");

const draft = async (req, res, next) => {

    const {id: owner} = req.user

    let params = ['Draft', owner]
    let sql = "INSERT INTO articles (created, modified, status, author_id) VALUES (datetime('now', 'localtime'), datetime('now', 'localtime'), ?, ?)"

    // creates new article record with default data, according to db schema
    await db.run(sql, params, function (err, _) {
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