const express = require('express')
const router = express.Router()

router.get('/get-test-users', (req, res, next) => {
    db.all('SELECT * FROM authors', function (err, rows) {
        if (err) {
            next(err)
        } else {
            res.json(rows)
        }
    })
})

router.get('/create-user-record', (req, res) => {
    res.render('create-user-record')
})

router.post('/create-user-record', (req, res, next) => {
    // const data = generateRandomData(10)
    // db.run('INSERT INTO articles () VALUES (?, ?)')
})

module.exports = router