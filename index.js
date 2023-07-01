const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser');
const path = require('path')
require('dotenv').config();
const axios = require('axios')

const port = process.env.PORT || 3000;

const instance = axios.create({
    baseURL: `http://localhost:${port}`
})

app.use(express.static('public'))
// app.use(express.static('scripts'))

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

const {mainRouter, authRouter, readerRouter, authorRouter, userRouter} = require('./routes')

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders(res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

// app.use(express.static('views'));
// app.use(express.static('scripts'));
app.use(express.static('public', options))
// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello world')
    // res.render('index.html')
})

app.use((req, res, next) => {
    next();
});

// app.use('/', mainRouter)
app.use('/auth', authRouter)
app.use('/author', authorRouter);
app.use('/reader', readerRouter)
// app.use('/user', userRouter);

app.use(function (err, req, res, next) {
    // res.status(err.status || 500)
    // res.render('error')
    const {status = 500, message = 'Server Error'} = err;
    res.status(status).json({message});
})

app.listen(port, () => {
    console.log(`Microblogger listening on port ${port}`);
})

module.exports = app




