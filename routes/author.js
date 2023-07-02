const express = require('express');
const router = express.Router();

const {headers, authenticate} = require('../middleware')

const validate = require('../middleware')

const {schemas} = require('../models')

const ctrl = require('../controls')

router.get('/home', headers, authenticate, ctrl.authorHome)

router.post("/home", headers, authenticate, ctrl.publish)

router.get("/article/edit", headers, authenticate, ctrl.edit)

router.post("/article/edit", headers, authenticate, ctrl.update)

router.get("/article/draft", headers, authenticate, ctrl.draft)

router.post('/article/delete', headers, authenticate, ctrl.remove)

router.get("/settings", headers, authenticate, ctrl.settings)

router.post("/settings", headers, authenticate, validate.body(schemas.settingsSchema), ctrl.updateSettings)

module.exports = router