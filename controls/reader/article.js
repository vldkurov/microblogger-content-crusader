const async = require('async')

const {ctrlWrapper} = require("../../helpers");

const article = async (req, res, next) => {

    const {id: owner} = req.user
    let params = [owner]

    const result = {}

    await async.parallel([
            function (callback) {
                let sql = 'SELECT id, name, isLogin FROM authors WHERE id=?'

                db.get(sql, [...params], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.author = rows
                        callback()
                    }
                })
            },
            function (callback) {
                let sql = "SELECT B.b_title, B.b_subtitle FROM authors LEFT JOIN blogs B ON authors.id=B.author_id WHERE authors.id=?"

                db.get(sql, [...params], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.blog = rows
                        callback()
                    }
                })
            },
            function (callback) {
                const {id} = req.query
                params = [id]
                let sql = 'SELECT articles.id, a_title, a_subtitle, created, modified, published, likes, status, body, name FROM articles, authors WHERE articles.id=? AND author_id=authors.id'

                db.get(sql, params, function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.article = rows
                        callback()
                    }
                })
            },
            function (callback) {
                let sql = 'SELECT comments.id, comments.body, comments.posted, comments.author_id, comments.article_id, name, articles.id FROM comments, authors, articles WHERE comments.article_id=articles.id AND comments.author_id=authors.id AND articles.id=? ORDER BY comments.posted DESC'

                db.all(sql, [req.query.id], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.comments = rows
                        callback()
                    }
                })
            }
        ],
        function (err) {
            if (err) {
                next(err)
            } else {
                return result
                    ? res.render('pages/reader/article.html', {
                        author: result.author,
                        isLogin: result.author.isLogin,
                        blog: result.blog,
                        article: result.article,
                        comments: result.comments,
                        path: '/reader/home/'
                    })
                    : res.json({
                        message: `No records found with the id ${params}`
                    })
            }
        }
    )
}

module.exports = {
    article: ctrlWrapper(article)
}
