const {ctrlWrapper} = require("../../helpers");
const comment = async (req, res, next) => {

    const {article_id, comment, author_id} = req.body

    let params = [comment, article_id, author_id]
    let sql = 'INSERT INTO comments (body, posted, article_id, author_id) VALUES (?, datetime(\'now\', \'localtime\'), ?, ?)'

    await db.run(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else {
            res.redirect(`/reader/article?id=${article_id}`)
        }
    })

}

module.exports = {
    comment: ctrlWrapper(comment)
}