const {ctrlWrapper} = require("../../helpers");
const like = async (req, res, next) => {

    const {id: owner} = req.user

    const {like, article_id} = req.body

    let params = [owner, article_id]
    let sql = 'SELECT * FROM likes WHERE author_id=? AND article_id=?'

    await db.get(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else if (rows) {
            res.json({
                message: 'You already like this article'
            })
        } else {

            params = [owner, article_id]
            sql = 'INSERT INTO likes (author_id, article_id) VALUES (?, ?)'

            db.run(sql, params)

            const value = Number(like) + 1

            params = [value, article_id]
            sql = 'UPDATE articles SET likes=? WHERE id=?'

            db.run(sql, params, function (err, rows) {
                if (err) {
                    next(err)
                } else {
                    res.redirect(`/reader/article?id=${article_id}`)
                }
            })
        }
    })
}

module.exports = {
    like: ctrlWrapper(like)
}