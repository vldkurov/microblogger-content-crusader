const {ctrlWrapper} = require("../../helpers");
const like = async (req, res, next) => {

    const {id: owner} = req.user

    const {like, article_id} = req.body

    let params = [owner, article_id]
    let sql = 'SELECT * FROM likes WHERE author_id=? AND article_id=?'

    // Current reader (author) can only like the article at once,
    // then table 'likes' is implemented to persist data about articles and authors.
    // This is a table in which each author corresponds to the id of the article that the author has already marked.
    // Only if the article has not been marked with 'like' before, then records to be updated.
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

            // updates the record in the table 'likes'
            db.run(sql, params)

            const value = Number(like) + 1

            params = [value, article_id]
            sql = 'UPDATE articles SET likes=? WHERE id=?'

            // updates the record in the 'article' table with the new value of 'likes'
            db.run(sql, params, function (err, _) {
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