const async = require('async')

const {ctrlWrapper} = require("../../helpers");

const settings = async (req, res, next) => {

    const {id: owner} = req.user
    let params = [owner]

    const result = {}

    await async.parallel([
            function (callback) {
                let sql = 'SELECT id, name, email, token, isLogin FROM authors WHERE id=?'

                // selects current user (author) upon id from request
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
                let sql = "SELECT B.id, B.b_title, B.b_subtitle FROM authors LEFT JOIN blogs B ON authors.id=B.author_id WHERE authors.id=?"

                // selects blog's record according to user's is to whom the blog belongs
                db.get(sql, [...params], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        result.blog = rows
                        callback()
                    }
                })
            },
        ],
        function (err) {
            if (err) {
                next(err)
            } else {
                return result
                    ? res.render('pages/author/settings.html', {
                        author: result.author,
                        isLogin: result.author.isLogin,
                        blog: result.blog,
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
    settings: ctrlWrapper(settings)
}
