const {ctrlWrapper} = require("../../helpers");
const main = async (req, res, next) => {

    let sql = 'SELECT name, email, isLogin FROM authors'

    await db.all(sql, function (err, rows) {
        if (err) {
            next(err)
        } else {
            return rows
                ? res.render('index.html', {
                    isLogin: rows.some(({isLogin}) => isLogin === 1),
                    author: rows.find(({isLogin}) => isLogin === 1),
                    path: '/'
                }) : res.send({
                    message: 'Something goes wrong, try again'
                })
        }
    })


}

module.exports = {
    main: ctrlWrapper(main)
}

