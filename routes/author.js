const express = require('express');
const router = express.Router();

const {authenticate} = require('../middleware')

const validate = require('../middleware')

const {schemas} = require('../models')

const ctrl = require('../controls')

router.get('/home', authenticate, ctrl.home)

router.post("/home", authenticate, ctrl.publish)

router.get("/article/edit", authenticate, ctrl.edit)

router.post("/article/edit", authenticate, ctrl.update)

router.get("/article/draft", authenticate, ctrl.draft)

router.post('/article/delete', authenticate, ctrl.remove)

router.get("/settings", authenticate, ctrl.settings)

router.post("/settings", authenticate, validate.body(schemas.settingsSchema), ctrl.updateSettings)

module.exports = router