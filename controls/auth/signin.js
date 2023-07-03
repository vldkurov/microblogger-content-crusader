const bcrypt = require('bcrypt')

const {ctrlWrapper, handleSignin} = require("../../helpers");

const SECRET_KEY = process.env.SECRET || 'secret word';

// signin controller
// inputs: user (author) credentials from signin-form;
// output: user (author) token and status isLogin;
const signin = (req, res, next) => {

    const {email, password} = req.body

    let params = [email]
    let sql = 'SELECT * FROM authors WHERE email=?'

    // check if user (author) with email and password exists in the table authors;
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

                // check if the password is equal to the record in table authors;
                const passwordCompare = await bcrypt.compare(password, rows.password)

                if (!passwordCompare) {
                    res.status(401).json({
                        message: 'E-mail or password invalid'
                    })
                } else {

                    // if a user exists and password compared ok, then signin starts;
                    handleSignin(rows, SECRET_KEY, res, next, email)
                }
            }
        })
}

module.exports = {
    signin: ctrlWrapper(signin)
}
