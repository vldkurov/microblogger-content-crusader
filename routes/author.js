const express = require('express');
const router = express.Router();

const {headers, validate, authenticate} = require('../middleware')

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

// article/edit, GET
// inputs: user, article, blog credentials;
// outputs: result object with the data to render 'Edit' page
router.get("/article/edit", headers, authenticate, ctrl.edit)

// article/edit, POST
// inputs: new article data - title, subtitle, body;
// outputs: updated article record, including the time of update
router.post("/article/edit", headers, authenticate, ctrl.update)

// article/draft, GET
// inputs: current user (author) id
// outputs: a new article draft record to table 'articles' with default data
router.get("/article/draft", headers, authenticate, ctrl.draft)

// article/delete, POST
// inputs: distinct article id
// outputs: article to be deleted from the table 'articles
router.post('/article/delete', headers, authenticate, ctrl.remove)

// settings, GET
// inputs: current user (author) id
// outputs: data object with values to be set
router.get("/settings", headers, authenticate, ctrl.settings)

// settings, POST
// inputs: user (author) id, blog record data - title, subtitle, id
// outputs: new blog record values
router.post("/settings", headers, authenticate, validate(schemas.settingsSchema), ctrl.updateSettings)

module.exports = router