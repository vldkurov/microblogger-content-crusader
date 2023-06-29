const {ctrlWrapper} = require("../../helpers");
const like = async (req, res, next) => {

    const {like, article_id, author_id} = req.body

    const value = Number(like) + 1

    let params = [value, article_id]
    let sql = 'UPDATE articles SET likes=? WHERE id=?'

    await db.run(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else {
            res.redirect(`/reader/article?id=${article_id}`)
        }
    })
}

module.exports = {
    like: ctrlWrapper(like)
}