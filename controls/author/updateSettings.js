const async = require("async");

const {ctrlWrapper} = require("../../helpers");
const updateSettings = async (req, res, next) => {

    let params = []

    await async.parallel([

            function (callback) {

                const {author, author_id} = req.body

                let sql = 'UPDATE authors SET name=? WHERE id=?'

                db.run(sql, [...params, author, author_id], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        callback()
                    }
                })
            },

            function (callback) {

                const {title, subtitle, blog_id} = req.body

                let sql = "UPDATE blogs SET b_title=?, b_subtitle=? WHERE id=?"

                db.run(sql, [...params, title, subtitle, blog_id], function (err, rows) {
                    if (err) {
                        return callback(err)
                    } else {
                        callback()
                    }
                })
            },
        ],
        function (err) {
            if (err) {
                next(err)
            } else {
                res.redirect('/author/home')
            }
        }
    )
}

module.exports = {
    updateSettings: ctrlWrapper(updateSettings)
}