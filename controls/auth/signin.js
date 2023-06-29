const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {ctrlWrapper, HttpError} = require("../../helpers");

const secret = process.env.SECRET || 'secret word';
const signin = async (req, res, next) => {

    const {email, password} = req.body

    let params = [email]
    let sql = 'SELECT * FROM authors WHERE author_email=?'

    await db.all(sql, params, async function (err, rows) {
        if (err) {
            next(err)
        } else {
            if (!rows.some(row => row.author_email === email)) {
                // throw HttpError(401, 'Email or password invalid')
                res.send('Email or password invalid')
                throw HttpError(401, 'Email or password invalid')
            }
            const passwordCompare = await bcrypt.compare(password, rows[0].author_password)
            if (!passwordCompare) {
                // throw HttpError(401, 'Email or password invalid')
                res.send('Email or password invalid')
                throw HttpError(401, 'Email or password invalid')
            }

            const payload = {
                email: email
            }

            const token = jwt.sign(payload, secret, {expiresIn: '1d'})

            params = [token, 1, email]
            sql = 'UPDATE authors SET token=?, isLogin=? WHERE author_email=?'

            db.run(sql, params, function (err, rows) {
                if (err) {
                    next(err)
                } else {
                    // res.redirect('/author/home')
                    res.send('Signin successfully')
                }
            })
        }
    })
}

module.exports = {
    signin: ctrlWrapper(signin)
}
