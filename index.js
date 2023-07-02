const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose()

const {mainRouter, authRouter, readerRouter, authorRouter} = require('./routes')

const app = express()

require('dotenv').config();

const db_path = 'database'

const db = new sqlite3.Database(`./${db_path}.db`, function (err) {
    if (err) {
        console.log(err);
        process.exit(1)
    } else {
        console.log(`Connected to database: ${db_path}.db`);
        db.run('PRAGMA foreign_keys=ON')
    }
})

global.db = db;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter)
app.use('/auth', authRouter)
app.use('/author', authorRouter)
app.use('/reader', readerRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Microblogger listening on port ${port}`);
})

module.exports = app




