if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const {ctrlWrapper} = require("../../helpers");

// current controller
// inputs: req object;
// output: current user (author) credentials from the req object;
// user credentials are added to a req object at handleSignin.js helper,
// and are available within a req object at any place of the app;
const current = async (req, res, next) => {
    const {name, email, token} = req.user
    res.json({user: {name, email}, token})
}

module.exports = {
    current: ctrlWrapper(current)
}