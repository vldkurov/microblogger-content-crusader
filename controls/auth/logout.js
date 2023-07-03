if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const {ctrlWrapper} = require("../../helpers");

// logout controller
// inputs: current user (author) credentials available within a req object;
// output: user token becomes equal to empty string, session ends;
const logout = async (req, res, next) => {

    const {id} = req.user

    let params = ['', 0, id]
    let sql = 'UPDATE authors SET token=?, isLogin=? WHERE id=?'

    // updates record in table authors;
    await db.run(sql, params, function (err, _) {
        if (err) {
            next(err)
        } else {
            localStorage.removeItem('token')
            res.redirect('/')
        }
    })
}

module.exports = {
    logout: ctrlWrapper(logout)
}