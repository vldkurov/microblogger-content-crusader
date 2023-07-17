const jwt = require('jsonwebtoken')

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const SECRET_KEY = process.env.SECRET || 'secret word';

const verifyToken = async (req, res, next) => {


    try {
        const {id, token} = JSON.parse(localStorage.getItem('author'))

        jwt.verify(token, SECRET_KEY, function (err, decoded) {
            if (err || !decoded) {

                localStorage.removeItem('author')

                let params = ['', 0, id]
                let sql = "UPDATE authors SET token=?, isLogin=? WHERE id=?"
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
        });
    } catch (e) {
        throw e
    }
}

module.exports = verifyToken