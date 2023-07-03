const express = require('express');
const router = express.Router();

const {headers, validate, authenticate} = require('../middleware')

const {schemas} = require('../models')

const ctrl = require('../controls')

router.get('/home', headers, authenticate, ctrl.readerHome)

router.get("/article", headers, authenticate, ctrl.article)

router.post("/article", headers, authenticate, validate(schemas.commentsSchema), ctrl.comment)

router.post("/article/like", headers, authenticate, ctrl.like)

module.exports = router