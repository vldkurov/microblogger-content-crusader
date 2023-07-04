const express = require('express');
const router = express.Router();

const {headers, validate, authenticate} = require('../middleware')

const {schemas} = require('../models')

const ctrl = require('../controls')

// home, GET
// inputs: current user (author) id
// outputs: data object with user, blog values, and all articles with 'published' status
router.get('/home', headers, authenticate, ctrl.readerHome)

// article, GET
// inputs: current user (author) id, article id from req.query;
// outputs: render a form to comment current article
router.get("/article", headers, authenticate, ctrl.article)

// article, POST
// inputs: current user (author) id, article id, and comment body from req.body
// outputs: new comment record to table 'comments'
router.post("/article", headers, authenticate, validate(schemas.commentsSchema), ctrl.comment)

// article/like, POST
// inputs: current user (author) id; article current 'like' value, article id from req.body
// outputs: article updated 'like' value
router.post("/article/like", headers, authenticate, ctrl.like)

module.exports = router