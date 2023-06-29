const async = require("async");

const {authenticate} = require('../../middleware')

const {ctrlWrapper} = require("../../helpers");

const edit = async (req, res, next) => {

    let params = [authenticate()]

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

                let sql = "SELECT A.id, A.a_title, A.a_subtitle, A.created, A.modified, A.published, A.likes, A.status, A.body FROM authors LEFT JOIN articles A ON authors.id=A.author_id  WHERE authors.id=? AND A.id=?"

                db.get(sql, [...params, req.query.id], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.edit = rows
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
                    ? res.render('pages/author/edit.html', {
                        author: result.author,
                        blog: result.blog,
                        edit: result.edit
                    })
                    : res.json({
                        message: `No records found with the id ${params}`
                    })
            }
        }
    )
}

module.exports = {
    edit: ctrlWrapper(edit)
}