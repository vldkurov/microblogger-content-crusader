// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

const {HttpError, ctrlWrapper} = require('../../helpers');

const secret = process.env.SECRET || 'secret word';
const signup = async (req, res, next) => {

    const{name, email,password}=req.body

    let params=[name, email, password]
    let sql='INSERT INTO authors (name, email, password) VALUES (?, ?, ?)'

    await db.run(sql, params)

    params=[email]
    sql='SELECT * from authors WHERE email=?'

    await db.get(sql, params, function (err, rows){
        if (err){next(err)}else{res.json({author: rows})}
    })


}

module.exports = {
    signup: ctrlWrapper(signup)
}
