const express = require('express');
const router = express.Router();

const {getCurrent, headers, validate, authenticate} = require('../middleware')

const {schemas} = require('../models')

const ctrl = require('../controls')

// home, GET
// inputs: select data from tables authors, blogs, articles;
// outputs: objects data to render on the main Author Page;

// Since user authorization is implemented in the app,
// with each AJAX request, it is necessary to attach a token to the request headers,
// and this function is implemented in the middleware 'headers'
router.get('/home', headers, authenticate, ctrl.authorHome)

// home, POST
// inputs: article credentials, to be published;
// outputs: article status is changed to 'published';
router.post("/home", headers, authenticate, ctrl.publish)

router.get("/article/edit", headers, authenticate, ctrl.edit)

router.post("/article/edit", headers, authenticate, ctrl.update)

router.get("/article/draft", headers, authenticate, ctrl.draft)

router.post('/article/delete', headers, authenticate, ctrl.remove)

router.get("/settings", headers, authenticate, ctrl.settings)

router.post("/settings", headers, authenticate, validate(schemas.settingsSchema), ctrl.updateSettings)

module.exports = router