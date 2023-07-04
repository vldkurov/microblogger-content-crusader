const {ctrlWrapper} = require("../../helpers");
const main = async (req, res, next) => {

    let sql = 'SELECT name, email, isLogin FROM authors'

    // the page itself does not render any data, but passes user's credentials to modal partials,
    // then user's data are collected and filtered upon 'isLogin' field
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

