const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const {HttpError, handleSignin, ctrlWrapper} = require('../../helpers');

const SECRET_KEY = process.env.SECRET || 'secret word';
const signup = async (req, res, next) => {

    const {name, email, password} = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    // let params = [name, email, hashPassword]
    // let sql = 'INSERT INTO authors (name, email, password) VALUES (?, ?, ?)'
    //
    // db.run(sql, params)
    //
    // params = [email]
    // sql = 'SELECT * from authors WHERE email=?'
    //
    // db.get(sql, params, function (err, rows) {
    //     if (err) {
    //         next(err)
    //     } else {
    //         res.status(201).json({author: rows})
    //     }
    // })

    let params = [email]
    let sql = 'SELECT * FROM authors WHERE email=?'

    await db.get(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else if (rows) {
            res.status(409).json({
                message: `E-mail ${email} already in use`
            })
        } else {

            params = [name, email, hashPassword]
            sql = 'INSERT INTO authors (name, email, password) VALUES (?, ?, ?)'

            db.run(sql, params)

            params = [email]
            sql = 'SELECT * FROM authors WHERE email=?'

            db.get(sql,
                params,
                function (err, rows) {
                    if (err) {
                        next(err)
                    } else {
                        handleSignin(rows, SECRET_KEY, res, next, email)
                    }
                })
        }
    })
}

module.exports = {
    signup: ctrlWrapper(signup)
}
