const express = require('express');
const router = express.Router();

const ctrl = require('../controls')

router.get('/', ctrl.main)

module.exports = router
