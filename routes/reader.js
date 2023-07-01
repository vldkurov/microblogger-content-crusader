const express = require('express');
const router = express.Router();

const {authenticate} = require('../middleware')

const ctrl = require('../controls')

router.get('/home', authenticate, ctrl.readerHome)

router.get("/article", authenticate, ctrl.article)

router.post("/article", authenticate, ctrl.comment)

router.post("/article/like", authenticate, ctrl.like)

module.exports = router