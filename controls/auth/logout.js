const {ctrlWrapper} = require("../../helpers");
const logout = async (req, res, next) => {
    console.log('Author signed out');
    res.redirect('/')
}

module.exports = {
    logout: ctrlWrapper(logout)
}