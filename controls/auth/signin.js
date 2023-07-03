const bcrypt = require('bcrypt')

const {ctrlWrapper, handleSignin} = require("../../helpers");

const SECRET_KEY = process.env.SECRET || 'secret word';
const signin = (req, res, next) => {

    const {email, password} = req.body

    let params = [email]
    let sql = 'SELECT * FROM authors WHERE email=?'

    db.get(sql,
        params,
        async function (err, rows) {
            if (err) {
                next(err)
            } else if (!rows) {
                res.status(401).json({
                    message: 'E-mail or password invalid'
                })
            } else {

                const passwordCompare = await bcrypt.compare(password, rows.password)

                if (!passwordCompare) {
                    res.status(401).json({
                        message: 'E-mail or password invalid'
                    })
                } else {
                    handleSignin(rows, SECRET_KEY, res, next, email)
                }
            }
        })
}

module.exports = {
    signin: ctrlWrapper(signin)
}
