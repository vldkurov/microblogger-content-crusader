const express = require('express');
const router = express.Router();

const {headers, authenticate} = require('../middleware')

const {schemas} = require('../models')

const ctrl = require('../controls')
const validate = require("../middleware");

router.get('/home', headers, authenticate, ctrl.readerHome)

router.get("/article", headers, authenticate, ctrl.article)

router.post("/article", headers, authenticate, validate.body(schemas.commentsSchema), ctrl.comment)

router.post("/article/like", headers, authenticate, ctrl.like)

module.exports = router