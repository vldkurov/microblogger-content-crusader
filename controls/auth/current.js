const {ctrlWrapper} = require("../../helpers");

// current controller
// inputs: req object;
// output: current user (author) credentials from the req object;
// user credentials added to a req object at handleSignin.js helper,
// and are available within a req object at any place of the app;
const current = async (req, res) => {
    const {name, email} = req.user

    res.json({name, email})
}

module.exports = {
    current: ctrlWrapper(current)
}