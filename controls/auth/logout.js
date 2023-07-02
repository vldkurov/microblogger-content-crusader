if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const {ctrlWrapper} = require("../../helpers");

const logout = async (req, res, next) => {

    const {id} = req.user

    let params = ['', 0, id]
    let sql = 'UPDATE authors SET token=?, isLogin=? WHERE id=?'

    await db.run(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else {
            localStorage.removeItem('token')
            // res.json({
            //     message: 'Logout success'
            // })
            res.redirect('/')
        }
    })

}

module.exports = {
    logout: ctrlWrapper(logout)
}