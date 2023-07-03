const {ctrlWrapper} = require("../../helpers");
const current = async (req, res) => {
    const {name, email} = req.user

    res.json({name, email})
}

module.exports = {
    current: ctrlWrapper(current)
}