const express = require('express');
const router = express.Router();

const ctrl = require('../controls')

// main page, GET
// inputs: current user (author) credentials, if registered and signed in
// outputs: main app page with no content
router.get('/', ctrl.main)

module.exports = router
