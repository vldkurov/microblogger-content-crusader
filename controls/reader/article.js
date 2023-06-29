const async = require('async')

const {authenticate} = require('../../middleware')

const {ctrlWrapper} = require("../../helpers");

const article = async (req, res, next) => {

    let params = [authenticate()]

    const result = {}

    await async.parallel([

            function (callback) {

                let sql = 'SELECT id, name, email, token, isLogin FROM authors WHERE id=?'

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
        
                let sql = "SELECT * FROM authors LEFT JOIN articles A ON authors.id=A.author_id WHERE authors.id=? AND A.id=?"

                db.get(sql, [...params, req.query.id], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.article = rows
                        callback()
                    }
                })
            },

            function (callback) {

                let sql = 'SELECT C.id, C.body, C.posted, C.author_id FROM articles LEFT JOIN comments C ON articles.id=C.article_id WHERE articles.id=? ORDER BY C.posted DESC'

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
                        blog: result.blog,
                        article: result.article,
                        comments: result.comments
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
