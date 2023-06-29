const express = require('express');
const router = express.Router();

const {authenticate, validate} = require('../middleware')

const {schemas} = require('../models')

const ctrl = require('../controls')

router.get('/home', ctrl.home)

router.post("/home", ctrl.publish)

router.get("/article/edit", ctrl.edit)

router.post("/article/edit", ctrl.update)

router.get("/article/draft", ctrl.draft)

router.post('/article/delete', ctrl.remove)

router.get("/settings", ctrl.settings)

router.post("/settings", validate(schemas.settingsSchema), ctrl.updateSettings)

module.exports = router