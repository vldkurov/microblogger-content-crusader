const jwt = require('jsonwebtoken')

const {HttpError} = require('../helpers');

const SECRET_KEY = process.env.SECRET || 'secret word';

const authenticate = async (req, res, next) => {

    const {authorization = ''} = req.headers

    const [bearer, token] = authorization.split(' ')
    if (bearer !== 'Bearer') {
        next(HttpError(401))
    }
    try {
        const {id} = jwt.verify(token, SECRET_KEY)
        let params = [id]
        let sql = 'SELECT * FROM authors WHERE id=?'

        await db.get(sql, params, function (err, rows) {
            if (err) {
                next(err)
            } else if (!rows || !rows.token || rows.token !== token) {
                next(HttpError(401))
            } else {
                req.user = rows
                next()
            }
        })

    } catch (e) {
        next(HttpError(401))
    }
}

module.exports = authenticate