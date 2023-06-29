// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const {HttpError, ctrlWrapper} = require('../../helpers');

const secret = process.env.SECRET || 'secret word';
const signup = async (req, res, next) => {

    const {name, email, password} = req.body

    let params = [email]
    let sql = 'SELECT name, email FROM authors WHERE email=?'

    await db.get(sql, params, function (err, rows) {
        if (err) {
            next(err)
        } else if (rows) {
            throw HttpError(409, "e-mail already in use")
            // return res.status(409).json({
            //     message: "e-mail already in use"
            // })
        } else {
            params = [name, email, password]
            sql = 'INSERT INTO authors (name, email, password) VALUES (?, ?, ?)'

            db.run(sql, params)

            params = [email]
            sql = 'SELECT * from authors WHERE email=?'

            db.get(sql, params, function (err, rows) {
                if (err) {
                    next(err)
                } else {
                    res.status(201).json({author: rows})
                }
            })
        }
    })


}

module.exports = {
    signup: ctrlWrapper(signup)
}
