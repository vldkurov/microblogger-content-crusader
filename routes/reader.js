const express = require('express');
const router = express.Router();

// const {authenticate} = require('../middleware')

const ctrl = require('../controls')

router.get('/home', ctrl.reader)

router.get("/article", ctrl.article)

router.post("/article", ctrl.comment)

router.post("/article/like", ctrl.like)

module.exports = router