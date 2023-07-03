const {ctrlWrapper} = require("../../helpers");
const comment = async (req, res, next) => {

    const {id: owner} = req.user

    const {article_id, comment} = req.body

    let params = [comment, article_id, owner]
    let sql = 'INSERT INTO comments (body, posted, article_id, author_id) VALUES (?, datetime(\'now\', \'localtime\'), ?, ?)'

    await db.run(sql, params, function (err, _) {
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