if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const getCurrent = async (req, res, next) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))

        let params = [token]
        let sql = 'SELECT token FROM authors WHERE token=?'

        await db.get(sql, params, function (err, rows) {
            if (err) {
                next(err)
            } else if (!rows || !rows.token || rows.token !== token) {
                // res.send('No rows found')
                localStorage.removeItem('token')
                res.redirect('/')
            } else {
                // res.json(rows.token)
                next()
            }
        })
    } catch (e) {
        throw e
    }
}

module.exports = getCurrent