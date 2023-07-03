const bcrypt = require('bcrypt')

const {handleSignin, ctrlWrapper} = require('../../helpers');

const SECRET_KEY = process.env.SECRET || 'secret word';

// signup controller
// inputs: new user (author) credentials from signup-form;
// output: new user (author) record in table authors;
const signup = async (req, res, next) => {

    const {name, email, password} = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    let params = [email]
    let sql = 'SELECT * FROM authors WHERE email=?'

    // check if user (author) exists
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

            // insert new record to table authors
            db.run(sql, params)

            params = [email]
            sql = 'SELECT * FROM authors WHERE email=?'

            // get new user (author) record from table authors with new id
            db.get(sql,
                params,
                function (err, rows) {
                    if (err) {
                        next(err)
                    } else {
                        const {id} = rows

                        params = [id]
                        sql = 'INSERT INTO blogs (author_id) VALUES (?)'

                        // insert user (author) id into table blogs to tie person with blog
                        db.run(sql, params)

                        // after new user (author) been created, app automatically initiates signin controller
                        handleSignin(rows, SECRET_KEY, res, next, email)
                    }
                })
        }
    })
}

module.exports = {
    signup: ctrlWrapper(signup)
}
