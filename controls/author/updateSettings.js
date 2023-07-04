const async = require("async");

const {ctrlWrapper} = require("../../helpers");
const updateSettings = async (req, res, next) => {

    const {id: owner} = req.user

    await async.parallel([
            function (callback) {
                const {author: name} = req.body

                let params = [name, owner]
                let sql = 'UPDATE authors SET name=? WHERE id=?'

                // updates current user (author) record values - name
                db.run(sql, params, function (err, _) {
                    if (err) {
                        return callback(err)
                    } else {
                        callback()
                    }
                })
            },
            function (callback) {
                const {title, subtitle, blog_id} = req.body

                let params = [title, subtitle, blog_id]
                let sql = "UPDATE blogs SET b_title=?, b_subtitle=? WHERE id=?"

                // updates current user's blog record values - title, subtitle
                db.run(sql, params, function (err, _) {
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