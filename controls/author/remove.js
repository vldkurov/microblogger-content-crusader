const {ctrlWrapper} = require("../../helpers");
const remove = async (req, res, next) => {

    const {id} = req.body

    let params = [id]
    let sql = 'DELETE FROM articles WHERE id=?'

    await db.run(sql, params, function (err, _) {
        if (err) {
            next(err)
        } else {
            res.redirect('/author/home')
        }
    })

}

module.exports = {
    remove: ctrlWrapper(remove)
}