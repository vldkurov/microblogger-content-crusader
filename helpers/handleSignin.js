const jwt = require("jsonwebtoken");

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const handleSignin = (rows, SECRET_KEY, res, next, email) => {

    const payload = {id: rows.id}

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1w'});

    let params = [token, 1, rows.id]
    let sql = 'UPDATE authors SET token=?, isLogin=? WHERE id=?'

    db.run(sql, params)

    params = [email]
    sql = 'SELECT * FROM authors WHERE email=?'

    db.get(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else {
            localStorage.setItem('token', JSON.stringify(rows.token));
            res.redirect('/author/home')
        }
    })
}

module.exports = handleSignin