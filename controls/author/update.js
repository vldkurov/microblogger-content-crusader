const {ctrlWrapper} = require("../../helpers");

const update = async (req, res, next) => {

    const {title, subtitle, body, id} = req.body

    let params = [title, subtitle, body, id]
    let sql = 'UPDATE articles SET a_title=?, a_subtitle=?, modified=datetime(\'now\', \'localtime\'), body=? WHERE id=?'

    await db.run(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else {
            res.redirect(`/author/article/edit?id=${id}`)
        }
    })
}

module.exports = {
    update: ctrlWrapper(update)
}