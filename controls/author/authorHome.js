const async = require('async')

const {ctrlWrapper} = require("../../helpers");

const authorHome = async (req, res, next) => {

    const {id: owner} = req.user

    let params = [owner]

    const result = {}

    // This controller takes author's id as argument,
    // and collects all relevant data from various tables to render on the main author's page.
    // Since all the data should be rendered on the page simultaneously, and one render method is available with response,
    // then parallel method from 'async' library is used.
    await async.parallel([
            function (callback) {

                let sql = 'SELECT name, email, token, isLogin FROM authors WHERE id=?'

                // gets the user (author) with known id
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

                // selects blog's data upon user's id to whom the blog belongs
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

                let sql = "SELECT B.b_title, B.b_subtitle, A.id, A.a_title, A.a_subtitle, A.created, A.modified, A.published, A.likes, A.status, A.body FROM authors LEFT JOIN articles A ON authors.id=A.author_id LEFT JOIN blogs B ON authors.id=B.author_id WHERE authors.id=? ORDER BY A.created"

                // selects only articles which belong distinct user with known id
                db.all(sql, [...params], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.articles = rows
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
                    ? res.render('pages/author/home.html', {
                        author: result.author,
                        isLogin: result.author.isLogin,
                        blog: result.blog,
                        draft: result.articles.filter(({status}) => status === 'Draft'),
                        published: result.articles.filter(({status}) => status === 'Published'),
                        path: '/author/home/'
                    })
                    : res.json({
                        message: `No records found with the id ${params}`
                    })
            }
        }
    )
}

module.exports = {
    authorHome: ctrlWrapper(authorHome)
}
