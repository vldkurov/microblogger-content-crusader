const async = require('async')

const mime = require('mime-types')

const {ctrlWrapper} = require("../../helpers");

const authorHome = async (req, res, next) => {

    const {id: owner} = req.user

    let params = [owner]

    const result = {}

    await async.parallel([

            function (callback) {

                let sql = 'SELECT name, email, token, isLogin FROM authors WHERE id=?'

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

                let sql = "SELECT B.b_title, B.b_subtitle, A.id, A.a_title, A.a_subtitle, A.created, A.modified, A.published, A.likes, A.status, A.body FROM authors LEFT JOIN articles A ON authors.id=A.author_id LEFT JOIN blogs B ON authors.id=B.author_id WHERE authors.id=? ORDER BY A.created"

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
                // res.set("Content-Type", mime.contentType('text/css'));
                // res.setHeader("Content-Type", mime.lookup('pages/author/authorHome.html'));
                // res.set('Content-Type', mime.lookup('pages/author/authorHome.html'));
                res.set('Authorization', 'Bearer ')
                return result
                    // ? res.json({
                    //     author: result.author,
                    //     blog: result.blog,
                    //     draft: result.articles.filter(({status}) => status === 'Draft'),
                    //     published: result.articles.filter(({status}) => status === 'Published')
                    // })
                    ? res.render('pages/author/home.html', {
                        author: result.author,
                        blog: result.blog,
                        draft: result.articles.filter(({status}) => status === 'Draft'),
                        published: result.articles.filter(({status}) => status === 'Published')
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
