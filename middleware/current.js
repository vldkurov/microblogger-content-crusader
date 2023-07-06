if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const current = async (req, res, next) => {
    try {
        const {id, token} = JSON.parse(localStorage.getItem('author'))

        let params = [token]
        let sql = 'SELECT token FROM authors WHERE token=?'

        await db.get(sql, params, function (err, rows) {
            if (err) {
                next(err)
            } else if (!rows || !rows.token || rows.token !== token) {

                localStorage.removeItem('author')

                params = ['', 0, id]
                sql = "UPDATE authors SET token=?, isLogin=? WHERE id=?"
                db.run(sql, params, function (err) {
                    if (err) {
                        next(err)
                    } else {
                        res.redirect('/')
                    }
                })
            } else {
                next()
            }
        })
    } catch (e) {
        throw e
    }
}

module.exports = current