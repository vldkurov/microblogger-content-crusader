const {ctrlWrapper} = require("../../helpers");
const publish = (req, res, next) => {

    const {id} = req.body

    let params = [0, 'Published', id]
    let sql = 'UPDATE articles SET published=datetime(\'now\', \'localtime\'), likes=?, status=? WHERE id=?'

    // updates article status to 'published,' article to be rendered in the 'Published' table
    db.run(sql, [...params], function (err, _) {
        if (err) {
            next(err)
        } else {
            res.redirect('/author/home')
        }
    })
}

module.exports = {
    publish: ctrlWrapper(publish)
}