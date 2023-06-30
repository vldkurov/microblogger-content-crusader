const jwt = require("jsonwebtoken");
const handleSignin = (rows, SECRET_KEY, res, next, email) => {

    const payload = {
        id: rows.id
    }, token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1d'});
    let params = [token, 1, rows.id]
    let sql = 'UPDATE authors SET token=?, isLogin=? WHERE id=?'

    db.run(sql, params)

    params = [email]
    sql = 'SELECT * FROM authors WHERE email=?'

    db.get(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else {
            res.json({author: rows})
        }
    })
}

module.exports = handleSignin